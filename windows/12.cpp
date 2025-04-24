#include <iostream>
#include <vector>
#include <climits>
#include <algorithm> // For sorting the processes

using namespace std;

struct Process
{
    int id, at, bt, rt, wt, tat, ct, priority;
};

// Function to calculate Turnaround Time (TAT) and Waiting Time (WT)
void calculateTimes(Process processes[], int n)
{
    for (int i = 0; i < n; i++)
    {
        processes[i].tat = processes[i].ct - processes[i].at;
        processes[i].wt = processes[i].tat - processes[i].bt;
    }
}

// Function to print the results
void printResults(Process processes[], int n)
{
    cout << "\nID  AT  BT  Priority  CT  TAT  WT\n";
    float avgTat = 0, avgWt = 0;
    for (int i = 0; i < n; i++)
    {
        cout << processes[i].id << "   " << processes[i].at << "   " << processes[i].bt << "   "
             << processes[i].priority << "   " << processes[i].ct << "   " << processes[i].tat << "   " << processes[i].wt << "\n";
        avgTat += processes[i].tat;
        avgWt += processes[i].wt;
    }
    avgTat /= n;
    avgWt /= n;
    cout << endl
         << "Average TAT: " << avgTat << endl;
    cout << "Average WT: " << avgWt << endl
         << endl;
}

// Function to print the Gantt chart
void printGanttChart(vector<int> ganttChart)
{
    cout << "\nGantt Chart:\n";
    for (int i = 0; i < ganttChart.size(); i++)
    {
        cout << "Process " << ganttChart[i] << " ";
    }
    cout << endl;
}

// Priority Scheduling (Preemptive)
void priorityScheduling()
{
    int n;
    cout << "Enter number of processes: ";
    cin >> n;
    Process processes[n];

    cout << "Enter Arrival Time, Burst Time & Priority for each process:\n";
    for (int i = 0; i < n; i++)
    {
        processes[i].id = i + 1;
        cout << "Process " << i + 1 << ": " << endl;
        cout << "Arrival Time: ";
        cin >> processes[i].at;
        cout << "Burst Time: ";
        cin >> processes[i].bt;
        cout << "Priority: ";
        cin >> processes[i].priority;
        processes[i].rt = processes[i].bt; // Remaining time initially equals burst time
    }

    // Sort processes based on Arrival Time (sort by priority during execution)
    sort(processes, processes + n, [](Process a, Process b)
         { return a.at < b.at; });

    int currentTime = 0;
    vector<bool> isCompleted(n, false); // Tracks if process is completed
    int completed = 0;
    vector<int> ganttChart; // To store the order of process execution for Gantt chart

    // Preemptive Scheduling
    while (completed < n)
    {
        // Find the process with the highest priority (lowest priority number)
        int idx = -1;
        int minPriority = INT_MAX;

        // Find the process that has arrived and has the lowest priority and is not completed
        for (int i = 0; i < n; i++)
        {
            if (!isCompleted[i] && processes[i].at <= currentTime && processes[i].priority < minPriority)
            {
                minPriority = processes[i].priority;
                idx = i;
            }
        }

        // If no process is ready to execute, increment time
        if (idx == -1)
        {
            currentTime++;
            continue;
        }

        // Execute the process
        processes[idx].rt--;                     // Decrease the remaining time
        ganttChart.push_back(processes[idx].id); // Add process ID to Gantt chart
        currentTime++;

        // If process is completed, update completion time and mark it as completed
        if (processes[idx].rt == 0)
        {
            processes[idx].ct = currentTime;
            isCompleted[idx] = true;
            completed++;
        }
    }

    // Calculate TAT and WT for all processes
    calculateTimes(processes, n);
    // Print the results
    printResults(processes, n);
    // Print the Gantt chart
    printGanttChart(ganttChart); // Print the Gantt chart
}

int main()
{
    int choice;
    do
    {
        cout << "\nScheduling Algorithms:\n";
        cout << "1. Priority Scheduling (Preemptive)\n";
        cout << "2. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            priorityScheduling(); // Run Priority Scheduling (Preemptive)
            break;
        case 2:
            cout << "Exiting...\n";
            break;
        default:
            cout << "Invalid choice! Try again.\n";
        }
    } while (choice != 2);

    return 0;
}
