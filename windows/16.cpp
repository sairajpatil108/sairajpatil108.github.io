#include <iostream>
#include <vector>
#include <climits> // Include for INT_MAX
#include <cmath>

using namespace std;

// Function to implement FIFO Disk Scheduling Algorithm
void FIFO(const vector<int> &requests, int initialPosition)
{
    int totalSeekCount = 0;
    int currentPosition = initialPosition;

    cout << "\nFIFO Disk Scheduling Algorithm:\n";
    cout << "Disk Access Order: ";

    // Calculate the total seek time for FIFO
    for (int i = 0; i < requests.size(); i++)
    {
        totalSeekCount += abs(requests[i] - currentPosition);
        currentPosition = requests[i];
        cout << requests[i] << " ";
    }
    cout << endl;
    cout << "Total Seek Count: " << totalSeekCount << endl;
    cout << "Average Seek Time: " << (float)totalSeekCount / requests.size() << endl;
}

// Function to implement SSTF Disk Scheduling Algorithm
void SSTF(const vector<int> &requests, int initialPosition)
{
    vector<int> remainingRequests = requests;
    int totalSeekCount = 0;
    int currentPosition = initialPosition;

    cout << "\nSSTF Disk Scheduling Algorithm:\n";
    cout << "Disk Access Order: ";

    // Process requests based on the SSTF algorithm
    while (!remainingRequests.empty())
    {
        // Find the request with the shortest seek time
        int minSeekTime = INT_MAX;
        int closestRequest = -1;
        int closestIndex = -1;

        for (int i = 0; i < remainingRequests.size(); i++)
        {
            int seekTime = abs(remainingRequests[i] - currentPosition);
            if (seekTime < minSeekTime)
            {
                minSeekTime = seekTime;
                closestRequest = remainingRequests[i];
                closestIndex = i;
            }
        }

        totalSeekCount += minSeekTime;
        currentPosition = closestRequest;
        remainingRequests.erase(remainingRequests.begin() + closestIndex);
        cout << closestRequest << " ";
    }

    cout << endl;
    cout << "Total Seek Count: " << totalSeekCount << endl;
    cout << "Average Seek Time: " << (float)totalSeekCount / requests.size() << endl;
}

int main()
{
    int n, initialPosition;

    // Input the number of disk requests and the initial position of the disk arm
    cout << "Enter the number of disk requests: ";
    cin >> n;

    vector<int> requests(n);

    cout << "Enter the disk requests (in the form of track numbers):\n";
    for (int i = 0; i < n; i++)
    {
        cout << "Request " << i + 1 << ": ";
        cin >> requests[i];
    }

    cout << "Enter the initial position of the disk arm: ";
    cin >> initialPosition;

    // Run the FIFO disk scheduling algorithm
    FIFO(requests, initialPosition);

    // Run the SSTF disk scheduling algorithm
    SSTF(requests, initialPosition);

    return 0;
}





// Enter the number of disk requests: 6
// Enter the disk requests (in the form of track numbers):
// Request 1: 98
// Request 2: 183
// Request 3: 41
// Request 4: 122
// Request 5: 14
// Request 6: 124
// Enter the initial position of the disk arm: 53