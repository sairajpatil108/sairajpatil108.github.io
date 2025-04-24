#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <sys/wait.h>  // Added for wait()

int main() {
    int pipefd[2];
    pid_t pid;

    // Create pipe
    if (pipe(pipefd) == -1) {
        perror("Pipe failed");
        exit(1);
    }

    // Create child process
    pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        exit(1);
    }

    if (pid == 0) {
        // Child Process - read from pipe and redirect output to a file
        close(pipefd[1]);  // Close write end
        dup2(pipefd[0], STDIN_FILENO);  // Redirect pipe input to stdin

        // Redirect output to "output.txt"
        int fd = open("output.txt", O_WRONLY | O_CREAT | O_TRUNC, 0644);
        if (fd == -1) {
            perror("File open failed");
            exit(1);
        }

        dup2(fd, STDOUT_FILENO);  // Redirect stdout to file
        close(fd);  // Close file descriptor

        // Execute the command that reads from pipe and writes to file
        execlp("cat", "cat", NULL);
        perror("execlp failed");
        exit(1);
    } else {
        // Parent Process - write to pipe
        close(pipefd[0]);  // Close read end
        char message[] = "Hello from Parent!";
        
        write(pipefd[1], message, sizeof(message));
        close(pipefd[1]);  // Close write end after writing

        // Wait for the child process to finish
        wait(NULL);
        printf("Message written to pipe and read by child.\n");
    }

    return 0;
}








// cd ~/Downloads/ass2
// gcc pipe.c -o pipe
// ./pipe
// cat output.txt





// Step-by-Step Process in Simple Terms:

//     Create a Pipe:

//         A pipe is created to let the parent and child processes talk to each other.

//         Imagine a pipe like a tunnel where data can be passed through from one end (parent) to the other end (child).

//     Fork the Process:

//         The program forks (splits) into two parts: a parent process and a child process.

//         The parent sends a message through the pipe to the child, and the child reads it.

//     Parent Process (Sends a Message):

//         The parent process writes the message "Hello from Parent!" and sends it into the pipe.

//         After sending the message, it waits for the child to finish.

//     Child Process (Reads the Message and Writes to a File):

//         The child process reads the message from the pipe.

//         It writes what it reads into a file called output.txt.

//     Child Finishes, Parent Waits:

//         After the child has finished writing the message to the file, the parent process waits for the child to complete.

//         Once the child is done, the program ends.