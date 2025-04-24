#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h> // Added for sleep() function

#define MAX_READERS 5
#define MAX_WRITERS 3

sem_t wrt;           // Semaphore for writers
pthread_mutex_t mtx; // Mutex for reader count synchronization
int sharedData = 0;  // Shared resource (data)
int numReader = 0;   // Counter for the number of readers

// Writer thread function
void *writer(void *wno)
{
    sem_wait(&wrt);              // Wait for the semaphore, block if a writer is active
    sharedData = sharedData * 2; // Writer modifies shared resource
    printf("Writer %d modified sharedData to %d\n", *((int *)wno), sharedData);
    sem_post(&wrt); // Signal that writer has finished
    return NULL;
}

// Reader thread function
void *reader(void *rno)
{
    pthread_mutex_lock(&mtx); // Lock the mutex for reader synchronization
    numReader++;              // Increment reader count

    if (numReader == 1)
    {
        sem_wait(&wrt); // First reader blocks writer
    }

    pthread_mutex_unlock(&mtx); // Unlock the mutex to allow other readers

    // Reading the shared data
    printf("Reader %d: read sharedData as %d\n", *((int *)rno), sharedData);
    sleep(1); // Simulate reading delay

    pthread_mutex_lock(&mtx); // Lock the mutex again for reader count update
    numReader--;              // Decrement reader count

    if (numReader == 0)
    {
        sem_post(&wrt); // Last reader releases writer
    }
    pthread_mutex_unlock(&mtx); // Unlock the mutex

    return NULL;
}

int main()
{
    pthread_t read[MAX_READERS], write[MAX_WRITERS];
    int readerId[MAX_READERS], writerId[MAX_WRITERS];

    sem_init(&wrt, 0, 1);           // Initialize the semaphore with value 1
    pthread_mutex_init(&mtx, NULL); // Initialize the mutex

    // Create reader threads
    for (int i = 0; i < MAX_READERS; i++)
    {
        readerId[i] = i + 1;
        pthread_create(&read[i], NULL, reader, (void *)&readerId[i]);
    }

    // Create writer threads
    for (int i = 0; i < MAX_WRITERS; i++)
    {
        writerId[i] = i + 1;
        pthread_create(&write[i], NULL, writer, (void *)&writerId[i]);
    }

    // Join reader threads
    for (int i = 0; i < MAX_READERS; i++)
    {
        pthread_join(read[i], NULL);
    }

    // Join writer threads
    for (int i = 0; i < MAX_WRITERS; i++)
    {
        pthread_join(write[i], NULL);
    }

    // Clean up
    sem_destroy(&wrt);           // Destroy semaphore
    pthread_mutex_destroy(&mtx); // Destroy mutex

    return 0;
}






// cd ~/Downloads/assignments  # Navigate to your folder
// g++ reader_writer.cpp -o reader_writer -pthread  # Compile the program
// ./reader_writer  # Run the program


// Enter number of processes: 5
// Enter number of resources: 3

// Enter Allocation Matrix:
// 0 1 0
// 2 0 0
// 3 0 2
// 2 1 1
// 0 0 2

// Enter Maximum Need Matrix:
// 7 5 3
// 3 2 2
// 9 0 2
// 2 2 2
// 4 3 3

// Enter Available Resources:
// 3 3 2


// Reader 1: read sharedData as 0
// Reader 2: read sharedData as 0
// Writer 1 modified sharedData to 0
// Reader 3: read sharedData as 0
// ...