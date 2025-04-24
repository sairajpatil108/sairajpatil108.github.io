#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>

using namespace std;

// Function to implement SCAN Disk Scheduling Algorithm
void SCAN(vector<int> &requests, int initialPosition, int diskSize)
{
    sort(requests.begin(), requests.end()); // Sort the request tracks in ascending order
    int totalSeekCount = 0;
    int currentPosition = initialPosition;

    // Find the closest direction: left or right
    int start = lower_bound(requests.begin(), requests.end(), initialPosition) - requests.begin();

    cout << "\nSCAN Disk Scheduling Algorithm:\n";
    cout << "Disk Access Order: ";

    // Move towards the left end
    for (int i = start - 1; i >= 0; i--)
    {
        totalSeekCount += abs(requests[i] - currentPosition);
        currentPosition = requests[i];
        cout << requests[i] << " ";
    }

    // Move towards the right end
    for (int i = start; i < requests.size(); i++)
    {
        totalSeekCount += abs(requests[i] - currentPosition);
        currentPosition = requests[i];
        cout << requests[i] << " ";
    }

    cout << endl;
    cout << "Total Seek Count: " << totalSeekCount << endl;
    cout << "Average Seek Time: " << (float)totalSeekCount / requests.size() << endl;
}

// Function to implement C-SCAN Disk Scheduling Algorithm
void C_SCAN(vector<int> &requests, int initialPosition, int diskSize)
{
    sort(requests.begin(), requests.end()); // Sort the request tracks in ascending order
    int totalSeekCount = 0;
    int currentPosition = initialPosition;

    // Find the closest direction: left or right
    int start = lower_bound(requests.begin(), requests.end(), initialPosition) - requests.begin();

    cout << "\nC-SCAN Disk Scheduling Algorithm:\n";
    cout << "Disk Access Order: ";

    // Move towards the right end first
    for (int i = start; i < requests.size(); i++)
    {
        totalSeekCount += abs(requests[i] - currentPosition);
        currentPosition = requests[i];
        cout << requests[i] << " ";
    }

    // After reaching the end, jump to the leftmost position (circular) and move right
    if (currentPosition != diskSize - 1)
    {
        totalSeekCount += abs(diskSize - 1 - currentPosition); // Jump to the end of the disk
        currentPosition = diskSize - 1;
        cout << diskSize - 1 << " ";
    }

    // Now move from the leftmost position to the farthest right request
    for (int i = 0; i < start; i++)
    {
        totalSeekCount += abs(requests[i] - currentPosition);
        currentPosition = requests[i];
        cout << requests[i] << " ";
    }

    cout << endl;
    cout << "Total Seek Count: " << totalSeekCount << endl;
    cout << "Average Seek Time: " << (float)totalSeekCount / requests.size() << endl;
}

int main()
{
    int n, initialPosition, diskSize;

    // Input the number of disk requests, the initial position, and the size of the disk
    cout << "Enter the number of disk requests: ";
    cin >> n;

    cout << "Enter the size of the disk: ";
    cin >> diskSize;

    vector<int> requests(n);

    cout << "Enter the disk requests (in the form of track numbers):\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Request " << i + 1 << ": ";
        cin >> requests[i];
    }

    cout << "Enter the initial position of the disk arm: ";
    cin >> initialPosition;

    // Run the SCAN disk scheduling algorithm
    SCAN(requests, initialPosition, diskSize);

    // Run the C-SCAN disk scheduling algorithm
    C_SCAN(requests, initialPosition, diskSize);

    return 0;
}

// Enter the number of disk requests: 6
// Enter the size of the disk: 200
// Enter the disk requests (in the form of track numbers):
// Request 1: 98
// Request 2: 183
// Request 3: 41
// Request 4: 122
// Request 5: 14
// Request 6: 124
// Enter the initial position of the disk arm: 53