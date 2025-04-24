#include <iostream>
#include <vector>
#include <climits>
#include <algorithm> // For sort()

using namespace std;

struct Process
{
    int id, at, bt, ct, wt, tat, priority;
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
void printGanttChart(Process processes[], int n)
{
    cout << "\nGantt Chart:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << processes[i].id << " executed from " << processes[i].ct - processes[i].bt << " to " << processes[i].ct << endl;
    }
}

// Priority Scheduling (Non-Preemptive)
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
    }

    // Sort processes based on Priority, then Arrival Time (if priorities are equal)
    sort(processes, processes + n, [](Process a, Process b)
         {
             if (a.priority == b.priority)
                 return a.at < b.at;         // If priorities are equal, use arrival time
             return a.priority < b.priority; // Lower priority value means higher priority
         });

    int currentTime = 0;
    for (int i = 0; i < n; i++)
    {
        if (currentTime < processes[i].at)
            currentTime = processes[i].at;
        processes[i].ct = currentTime + processes[i].bt;
        currentTime = processes[i].ct;
    }

    calculateTimes(processes, n);
    printResults(processes, n);
    printGanttChart(processes, n); // Print the Gantt chart
}

int main()
{
    int choice;
    do
    {
        cout << "\nScheduling Algorithms:\n";
        cout << "1. Priority Scheduling (Non Preemptive)\n";
        cout << "2. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            priorityScheduling(); // Run Priority Scheduling (Non-Preemptive)
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
