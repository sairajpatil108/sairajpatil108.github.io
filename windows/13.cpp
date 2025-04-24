#include <iostream>
#include <vector>
#include <unordered_map>
#include <climits> // For INT_MAX

using namespace std;

// Function to implement LRU (Least Recently Used) page replacement
void LRU(int pages[], int pageCount, int frameSize)
{
    vector<int> frame(frameSize, -1); // Initialize frame with -1 (empty slots)
    unordered_map<int, int> pageMap;  // Map to store the page index in frame
    int pageFaults = 0, time = 0;     // To count page faults and simulate time

    cout << "\nLRU Page Replacement:\n";

    // Traverse through all pages
    for (int i = 0; i < pageCount; i++)
    {
        int page = pages[i];
        bool found = false;

        // Check if page is already in the frame
        if (pageMap.find(page) != pageMap.end())
        {
            found = true;
            pageMap[page] = time++; // Update the last used time
        }

        // If the page is not found in the frame, we need to load it
        if (!found)
        {
            // Check if there is space in the frame
            if (pageMap.size() < frameSize)
            {
                frame[pageMap.size()] = page; // Add the new page to the frame
                pageMap[page] = time++;       // Record the last time used
            }
            else
            {
                // If the frame is full, we must replace the least recently used page
                int lruPage = -1, lruTime = INT_MAX;

                // Find the least recently used page
                for (auto &entry : pageMap)
                {
                    if (entry.second < lruTime)
                    {
                        lruTime = entry.second;
                        lruPage = entry.first;
                    }
                }

                // Replace the least recently used page
                pageMap.erase(lruPage); // Remove the least recently used page
                pageMap[page] = time++; // Add the new page with updated time
            }
            pageFaults++;
        }

        // Display the current state of the frame
        cout << "Page " << page << ": ";
        for (int j = 0; j < frameSize; j++)
        {
            if (frame[j] != -1)
                cout << frame[j] << " ";
            else
                cout << "- ";
        }
        cout << endl;
    }

    // Print final statistics
    float hitPercentage = ((pageCount - pageFaults) * 100.0f) / pageCount;
    float faultPercentage = (pageFaults * 100.0f) / pageCount;
    cout << "\nTotal Page Faults: " << pageFaults << endl;
    cout << "Hit Percentage: " << hitPercentage << "%" << endl;
    cout << "Fault Percentage: " << faultPercentage << "%" << endl;
}

int main()
{
    int pages[50], pageCount, frameSize;
    int choice;

    // Input the page reference string and frame size
    cout << "Enter number of pages: ";
    cin >> pageCount;
    cout << "Enter the page reference string:\n";
    for (int i = 0; i < pageCount; i++)
    {
        cout << "Page " << i + 1 << ": ";
        cin >> pages[i];
    }
    cout << "Enter number of frames: ";
    cin >> frameSize;

    // Run LRU page replacement
    LRU(pages, pageCount, frameSize);

    return 0;
}









// Enter number of pages: 10
// Enter the page reference string:
// Page 1: 7
// Page 2: 0
// Page 3: 1
// Page 4: 2
// Page 5: 0
// Page 6: 3
// Page 7: 0
// Page 8: 4
// Page 9: 2
// Page 10: 3
// Enter number of frames: 4