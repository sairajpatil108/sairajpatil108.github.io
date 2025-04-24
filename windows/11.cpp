#include <iostream>
#include <vector>
#include <algorithm>
#include <climits>

using namespace std;

struct Process
{
    int id, at, bt, rt, wt, tat, ct;
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

// Function to print the Gantt chart
void printGanttChart(Process processes[], int n)
{
    cout << "\nGantt Chart:\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Process " << processes[i].id << " executed from " << processes[i].ct - processes[i].bt << " to " << processes[i].ct << endl;
    }
}

// SJF Scheduling (Preemptive)
void sjfPreemptive()
{
    int n;
    cout << "Enter number of processes: ";
    cin >> n;
    Process processes[n];

    cout << "Enter Arrival Time & Burst Time for each process:\n";
    for (int i = 0; i < n; i++)
    {
        processes[i].id = i + 1;
        cout << "Process " << i + 1 << ": " << endl;
        cout << "Arrival Time: ";
        cin >> processes[i].at;
        cout << "Burst Time: ";
        cin >> processes[i].bt;
        processes[i].rt = processes[i].bt; // Remaining time initially equals burst time
    }

    int currentTime = 0;
    int completed = 0;
    vector<bool> isCompleted(n, false);
    vector<int> readyQueue;

    while (completed < n)
    {
        // Find the process with the shortest remaining time at the current time
        int idx = -1;
        int minRt = INT_MAX;

        for (int i = 0; i < n; i++)
        {
            if (!isCompleted[i] && processes[i].at <= currentTime && processes[i].rt < minRt)
            {
                minRt = processes[i].rt;
                idx = i;
            }
        }

        if (idx == -1)
        {
            // If no process is ready, increment the time
            currentTime++;
            continue;
        }

        // Execute the process with the shortest remaining time
        processes[idx].rt--; // Reduce the remaining time
        currentTime++;

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
    printGanttChart(processes, n); // Print the Gantt chart
}

int main()
{
    int choice;
    do
    {
        cout << "\nScheduling Algorithms:\n";
        cout << "1. SJF (Shortest Job First) - Preemptive\n";
        cout << "2. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            sjfPreemptive(); // Run SJF (Preemptive) scheduling
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
