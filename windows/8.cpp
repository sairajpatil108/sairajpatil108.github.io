#include <iostream>
#include <vector>
#include <climits>

using namespace std;

struct Process
{
    int id, at, bt, rt, wt, tat, ct; // rt is the remaining time
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

// Round Robin Scheduling (Preemptive)
void roundRobin()
{
    int n, tq;
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

        // Ensure burst time is greater than zero
        if (processes[i].bt <= 0)
        {
            cout << "Burst Time must be greater than 0. Please enter again for Process " << i + 1 << ": ";
            cin >> processes[i].bt;
        }
        processes[i].rt = processes[i].bt; // Remaining time initially equals burst time
    }

    cout << "Enter Time Quantum: ";
    cin >> tq;

    vector<int> readyQueue; // Using vector instead of queue to manage ready processes
    int currentTime = 0, completed = 0;

    // To hold the completion times
    vector<bool> isCompleted(n, false);

    readyQueue.push_back(0); // Push the first process into the ready queue

    // For storing the Gantt chart
    vector<string> ganttChart;

    while (completed < n)
    {
        int currentProcessIndex = readyQueue.front();
        readyQueue.erase(readyQueue.begin()); // Remove the first element from the vector

        // If the process is not completed
        if (processes[currentProcessIndex].rt > 0)
        {
            int startTime = currentTime;

            // If the remaining time is less than or equal to the time quantum
            if (processes[currentProcessIndex].rt <= tq)
            {
                currentTime += processes[currentProcessIndex].rt;
                processes[currentProcessIndex].rt = 0; // Mark the process as completed
                processes[currentProcessIndex].ct = currentTime;
                completed++;
                isCompleted[currentProcessIndex] = true;
            }
            else
            {
                currentTime += tq;
                processes[currentProcessIndex].rt -= tq;   // Reduce the remaining time
                readyQueue.push_back(currentProcessIndex); // Requeue the process
            }
            ganttChart.push_back("Process " + to_string(processes[currentProcessIndex].id) + " executed from " + to_string(startTime) + " to " + to_string(currentTime));
        }

        // Push the processes that have arrived at the current time into the ready queue
        for (int i = 0; i < n; i++)
        {
            if (!isCompleted[i] && processes[i].at <= currentTime)
            {
                // Check if the process is already in the readyQueue
                bool alreadyInQueue = false;
                for (int j = 0; j < readyQueue.size(); j++)
                {
                    if (readyQueue[j] == i)
                    {
                        alreadyInQueue = true;
                        break;
                    }
                }

                if (!alreadyInQueue)
                {
                    readyQueue.push_back(i);
                }
            }
        }
    }

    calculateTimes(processes, n);
    printResults(processes, n);

    // Print the Gantt chart
    cout << "\nGantt Chart:\n";
    for (const string &gantt : ganttChart)
    {
        cout << gantt << endl;
    }
}

int main()
{
    int choice;
    do
    {
        cout << "\nScheduling Algorithms:\n";
        cout << "1. Round Robin (Preemptive)\n";
        cout << "2. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            roundRobin(); // Run Round Robin scheduling
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
