#include <iostream>
#include <unistd.h>
#include <sys/wait.h>
#include <cstdlib>
using namespace std;

void show_menu()
{
    cout << "\n1) Fork";
    cout << "\n2) Wait";
    cout << "\n3) Exec (ls -l)";
    cout << "\n4) Copy file (cp)";
    cout << "\n5) Search in file (grep)";
    cout << "\n6) Exit";
    cout << "\nEnter choice: ";
}

void do_fork()
{
    pid_t pid = fork();
    if (pid == 0)
    {
        cout << "Child Process. PID: " << getpid() << ", Parent PID: " << getppid() << endl;
        exit(0);
    }
    else if (pid > 0)
    {
        cout << "Parent Process. PID: " << getpid() << ", Child PID: " << pid << endl;
    }
    else
    {
        perror("fork failed");
    }
}

void do_wait()
{
    pid_t pid = fork();
    if (pid == 0)
    {
        cout << "Child PID: " << getpid() << " doing work..." << endl;
        sleep(2);
        exit(5);
    }
    else
    {
        int status;
        waitpid(pid, &status, 0);
        cout << "Parent waited. Child exited with status: " << WEXITSTATUS(status) << endl;
    }
}

void do_exec()
{
    pid_t pid = fork();
    if (pid == 0)
    {
        cout << "Listing files (ls -l):" << endl;
        execlp("ls", "ls", "-l", NULL);
        perror("exec failed");
        exit(1);
    }
    else
    {
        wait(NULL);
    }
}

void do_cp()
{
    pid_t pid = fork();
    if (pid == 0)
    {
        cout << "Copying src.txt to dest.txt..." << endl;
        execlp("cp", "cp", "src.txt", "dest.txt", NULL);
        perror("cp failed");
        exit(1);
    }
    else
    {
        wait(NULL);
        cout << "File copy done." << endl;
    }
}

void do_grep()
{
    string word;
    cout << "Enter word to search: ";
    cin >> word;

    pid_t pid = fork();
    if (pid == 0)
    {
        cout << "Searching for word: " << word << endl;
        execlp("grep", "grep", word.c_str(), "src.txt", NULL);
        perror("grep failed");
        exit(1);
    }
    else
    {
        wait(NULL);
        cout << "Search complete." << endl;
    }
}

int main()
{
    while (true)
    {
        show_menu();
        int choice;
        cin >> choice;
        switch (choice)
        {
        case 1:
            do_fork();
            break;
        case 2:
            do_wait();
            break;
        case 3:
            do_exec();
            break;
        case 4:
            do_cp();
            break;
        case 5:
            do_grep();
            break;
        case 6:
            cout << "Exiting...\n";
            return 0;
        default:
            cout << "Invalid choice!\n";
            break;
        }
    }
}