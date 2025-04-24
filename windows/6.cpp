#include <iostream>
#include <vector>

using namespace std;

struct Block
{
    int size;
    bool allocated; // If block is allocated or not
};

struct Process
{
    int size;
    int allocatedBlock; // The index of the allocated block (-1 if not allocated)
};

void nextFit(vector<Block> &blocks, int numBlocks, vector<Process> &processes, int numProcesses)
{
    static int lastAllocIdx = 0; // To remember the last allocated block index

    for (int i = 0; i < numProcesses; i++)
    {
        processes[i].allocatedBlock = -1; // Initially, no process is allocated
        int count = 0, j = lastAllocIdx;

        // Try to find a block for the process
        while (count < numBlocks)
        {
            if (!blocks[j].allocated && blocks[j].size >= processes[i].size)
            {
                processes[i].allocatedBlock = j;
                blocks[j].allocated = true;
                lastAllocIdx = (j + 1) % numBlocks; // Update the last allocated index
                break;
            }
            j = (j + 1) % numBlocks;
            count++;
        }
    }
}

void worstFit(vector<Block> &blocks, int numBlocks, vector<Process> &processes, int numProcesses)
{
    for (int i = 0; i < numProcesses; i++)
    {
        int worstIdx = -1;
        int maxSize = -1; // Initially setting to a very small number

        for (int j = 0; j < numBlocks; j++)
        {
            if (!blocks[j].allocated && blocks[j].size >= processes[i].size && blocks[j].size > maxSize)
            {
                worstIdx = j;
                maxSize = blocks[j].size;
            }
        }

        if (worstIdx != -1)
        {
            processes[i].allocatedBlock = worstIdx;
            blocks[worstIdx].allocated = true;
        }
    }
}

void printResults(vector<Process> &processes, int numProcesses)
{
    cout << "\nProcess Allocation Results:\n";
    for (int i = 0; i < numProcesses; i++)
    {
        cout << "Process " << i + 1 << " (Size " << processes[i].size << ") -> ";
        if (processes[i].allocatedBlock != -1)
            cout << "Block " << processes[i].allocatedBlock + 1 << "\n";
        else
            cout << "Not Allocated\n";
    }
}

int main()
{
    int numBlocks, numProcesses;

    cout << "Enter number of memory blocks: ";
    cin >> numBlocks;
    vector<Block> blocks(numBlocks);

    cout << "Enter block sizes:\n";
    for (int i = 0; i < numBlocks; i++)
    {
        cin >> blocks[i].size;
        blocks[i].allocated = false; // Initially, no blocks are allocated
    }

    cout << "Enter number of processes: ";
    cin >> numProcesses;
    vector<Process> processes(numProcesses);

    cout << "Enter process sizes:\n";
    for (int i = 0; i < numProcesses; i++)
    {
        cin >> processes[i].size;
        processes[i].allocatedBlock = -1; // Initially, no processes are allocated
    }

    int choice;
    do
    {
        // Reset allocation status
        for (int i = 0; i < numBlocks; i++)
            blocks[i].allocated = false;
        for (int i = 0; i < numProcesses; i++)
            processes[i].allocatedBlock = -1;

        cout << "\nMemory Allocation Techniques:\n";
        cout << "1. Next Fit\n2. Worst Fit\n3. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice)
        {
        case 1:
            nextFit(blocks, numBlocks, processes, numProcesses);
            printResults(processes, numProcesses);
            break;
        case 2:
            worstFit(blocks, numBlocks, processes, numProcesses);
            printResults(processes, numProcesses);
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






// g++ memory_allocation.cpp -o memory_allocation
// ./memory_allocation

// Enter number of memory blocks: 4
// Enter block sizes:
// 200 20 700 50

// Enter number of processes: 4
// Enter process sizes:
// 20 200 500 50


// Memory Allocation Techniques:
// 1. Next Fit
// 2. Worst Fit
// 3. Exit
// Enter your choice: 1

// Process Allocation Results:
// Process 1 (Size 20) -> Block 1
// Process 2 (Size 200) -> Block 3
// Process 3 (Size 500) -> Not Allocated
// Process 4 (Size 50) -> Block 4


// Memory Allocation Techniques:
// 1. Next Fit
// 2. Worst Fit
// 3. Exit
// Enter your choice: 2

// Process Allocation Results:
// Process 1 (Size 20) -> Block 3
// Process 2 (Size 200) -> Block 1
// Process 3 (Size 500) -> Not Allocated
// Process 4 (Size 50) -> Block 4