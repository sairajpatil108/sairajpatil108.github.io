#include <iostream>
#include <vector>
#include <unordered_set>

using namespace std;

// Function to implement FCFS (First-Come, First-Serve) page replacement
void FCFS(int pages[], int pageCount, int frameSize)
{
    vector<int> frame(frameSize, -1); // Initialize frame with -1 (empty slots)
    unordered_set<int> pageSet;       // Set to check if page is already in memory
    int pageFaults = 0;               // To count page faults

    cout << "\nFCFS Page Replacement:\n";

    // Traverse through all pages
    for (int i = 0; i < pageCount; i++)
    {
        int page = pages[i];
        bool found = false;

        // Check if page is already in the frame
        if (pageSet.find(page) != pageSet.end())
        {
            found = true; // Page hit, do nothing
        }

        // If the page is not found in the frame, we need to load it
        if (!found)
        {
            // If there is space in the frame, add the new page
            if (pageSet.size() < frameSize)
            {
                frame[pageSet.size()] = page; // Add the new page to the frame
                pageSet.insert(page);         // Insert into the page set
            }
            else
            {
                // If the frame is full, replace the first page (FCFS)
                pageSet.erase(frame[0]); // Remove the first page
                // Shift the pages to the left in the frame
                for (int j = 1; j < frameSize; j++)
                {
                    frame[j - 1] = frame[j];
                }
                // Add the new page to the frame
                frame[frameSize - 1] = page;
                pageSet.insert(page); // Insert into the page set
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

    // Run FCFS page replacement
    FCFS(pages, pageCount, frameSize);

    return 0;
}
