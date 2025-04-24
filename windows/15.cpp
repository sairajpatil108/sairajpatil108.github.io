#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

// Function to implement Optimal Page Replacement Algorithm
void Optimal(int pages[], int pageCount, int frameSize)
{
    vector<int> frame(frameSize, -1); // Initialize frame with -1 (empty slots)
    int pageFaults = 0;               // To count page faults

    cout << "\nOptimal Page Replacement:\n";

    // Traverse through all pages
    for (int i = 0; i < pageCount; i++)
    {
        int page = pages[i];
        bool found = false;

        // Check if page is already in the frame
        for (int j = 0; j < frameSize; j++)
        {
            if (frame[j] == page)
            {
                found = true; // Page hit
                break;
            }
        }

        // If the page is not found in the frame, we need to load it
        if (!found)
        {
            // If there is space in the frame, add the new page
            bool added = false;
            for (int j = 0; j < frameSize; j++)
            {
                if (frame[j] == -1)
                {
                    frame[j] = page; // Add the new page to the frame
                    added = true;
                    break;
                }
            }

            // If the frame is full, replace the optimal page
            if (!added)
            {
                // Find the page to replace (the one that will be used furthest in the future)
                int farthest = -1, pageToReplace = -1;
                for (int j = 0; j < frameSize; j++)
                {
                    bool foundInFuture = false;
                    // Check if this page is used again in the future
                    for (int k = i + 1; k < pageCount; k++)
                    {
                        if (frame[j] == pages[k])
                        {
                            foundInFuture = true;
                            break;
                        }
                    }

                    // If the page is not used in the future or used after all others
                    if (!foundInFuture)
                    {
                        pageToReplace = frame[j];
                        break;
                    }

                    // If the page is used in future, find the one that is used the farthest in the future
                    if (farthest == -1)
                    {
                        farthest = j;
                        pageToReplace = frame[j];
                    }
                }

                // Replace the farthest page
                for (int j = 0; j < frameSize; j++)
                {
                    if (frame[j] == pageToReplace)
                    {
                        frame[j] = page;
                        break;
                    }
                }
            }

            pageFaults++; // A page fault occurred
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

    // Run Optimal page replacement
    Optimal(pages, pageCount, frameSize);

    return 0;
}
