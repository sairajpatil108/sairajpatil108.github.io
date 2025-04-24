#include <iostream>
#include <vector>
#include <climits>
#include <algorithm> // For sort() function

using namespace std;

struct Process
{
    int id, at, bt, ct, tat, wt;
};

void calculateTimes(Process processes[], int n)
{
    for (int i = 0; i < n; i++)
    {
        processes[i].tat = processes[i].ct - processes[i].at;
        processes[i].wt = processes[i].tat - processes[i].bt;
    }
}

void printResults(Process processes[], int n)
{
    cout << "\nID  AT  BT  CT  TAT  WT\n";
    float avgTat = 0, avgWt = 0;
    for (int i = 0; i < n; i++)
    {
        cout << processes[i].id << "   " << processes[i].at << "   " << processes[i].bt << "   " << processes[i].ct << "   " << processes[i].tat << "   " << processes[i].wt << "\n";
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

void printGanttChart(Process processes[], int n)
{
    cout << "\nGantt Chart:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << processes[i].id << " executed from " << processes[i].ct - processes[i].bt << " to " << processes[i].ct << endl;
    }
}

// FCFS Scheduling (Non-Preemptive)
void fcfs()
{
    int n;
    cout << "Enter number of processes: ";
    cin >> n;
    Process processes[n];

    cout << "Enter Arrival Time & Burst Time:\n";
    for (int i = 0; i < n; i++)
    {
        processes[i].id = i + 1;
        cout << "Process " << i + 1 << ": " << endl;
        cout << "Arrival Time: ";
        cin >> processes[i].at;
        cout << "Burst Time: ";
        cin >> processes[i].bt;
    }

    // Sort processes based on Arrival Time (Non-Preemptive)
    sort(processes, processes + n, [](Process a, Process b)
         { return a.at < b.at; });

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
    printGanttChart(processes, n); // Display Gantt Chart
}

// SJF Scheduling (Non-Preemptive)
void sjfNonPreemptive()
{
    int n;
    cout << "Enter number of processes: ";
    cin >> n;
    Process processes[n];

    cout << "Enter Arrival Time & Burst Time:\n";
    for (int i = 0; i < n; i++)
    {
        processes[i].id = i + 1;
        cout << "Process " << i + 1 << ": " << endl;
        cout << "Arrival Time: ";
        cin >> processes[i].at;
        cout << "Burst Time: ";
        cin >> processes[i].bt;
    }

    // Sort processes based on Arrival Time
    sort(processes, processes + n, [](Process a, Process b)
         { return a.at < b.at; });

    int currentTime = 0;
    vector<bool> completed(n, false); // To track completion status of processes
    int completedCount = 0;

    while (completedCount < n)
    {
        int minIndex = -1;
        int minBt = INT_MAX; // Initially set to a very large number

        // Find process with shortest burst time and arrival time <= currentTime
        for (int i = 0; i < n; i++)
        {
            if (!completed[i] && processes[i].at <= currentTime && processes[i].bt < minBt)
            {
                minBt = processes[i].bt;
                minIndex = i;
            }
        }

        // If no process is ready, increment time
        if (minIndex == -1)
        {
            currentTime++;
            continue;
        }

        // Process execution
        processes[minIndex].ct = currentTime + processes[minIndex].bt;
        currentTime = processes[minIndex].ct;
        completed[minIndex] = true;
        completedCount++;
    }

    calculateTimes(processes, n);
    printResults(processes, n);
    printGanttChart(processes, n); // Display Gantt Chart
}

int main()
{
    int choice;
    do
    {
        cout << "\nScheduling Algorithms:\n";
        cout << "1. FCFS (First Come First Serve)\n";
        cout << "2. SJF (Shortest Job First) - Non Preemptive\n";
        cout << "3. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            fcfs(); // Run FCFS scheduling
            break;
        case 2:
            sjfNonPreemptive(); // Run SJF scheduling
            break;
        case 3:
            cout << "Exiting...\n";
            break;
        default:
            cout << "Invalid choice! Try again.\n";
        }
    } while (choice != 3);

    return 0;
}







// Enter number of processes: 4
// Enter Arrival Time & Burst Time:

// Process 1:
// Arrival Time: 0
// Burst Time: 9

// Process 2:
// Arrival Time: 1
// Burst Time: 3

// Process 3:
// Arrival Time: 2
// Burst Time: 2

// Process 4:
// Arrival Time: 1
// Burst Time: 4