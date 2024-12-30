#include <stdio.h>
#include <stdlib.h>
#include <string.h>

char *formatNumber(char *input, char begin, char divider)
{
    int length = strlen(input);

    // Determine the length of the formatted string:
    // [length] + [number of dividers] + [1 for begin sign] + [1 for null terminator]
    int formattedLength = length + length / 3 + 2;

    // Allocate memory for the formatted string
    char *formattedNumber = (char *)malloc(formattedLength);

    int j = 0;                   // index for the formatted string
    int commaCount = length % 3; // determine where the first divider should be placed

    // Add begin sign at the beginning
    formattedNumber[0] = begin;
    j = j + 1;

    // Iterate over the original string from the beginning
    for (int i = 0; i < length; i++)
    {
        formattedNumber[j] = input[i];
        j = j + 1;

        // Add a divider every three digits, but not after the last digit
        if (commaCount > 0 && i < length - 1 && (i + 1) % 3 == commaCount)
        {
            formattedNumber[j++] = divider;
        }
        else if (commaCount == 0 && i < length - 1 && (i + 1) % 3 == 0)
        {
            formattedNumber[j++] = divider;
        }
    }
    // add space in the end.
    formattedNumber[j] = ' ';
    
    // Null-terminate the formatted string
    formattedNumber[++j] = '\0';

    return formattedNumber;
}

int main(int argc, char *argv[])
{

    // open file with write flag.
    // we use pointer here to point to the file.
    FILE *outputfile = fopen(argv[1], "w");

    // allocate memory to save one complete number into.
    char *number = (char *)malloc(10 * sizeof(char));
    int index = 0;

    // reads one char from stdin
    int c = fgetc(stdin);

    // keeps reading until the endoffile sign.
    while (c != EOF)
    {
        // accumulate the digits until we completely read a single number.
        if (c != ' ')
        {
            number[index] = c;
            index++;
        }

        if (c == ' ')
        {
            if (index > 0)
            {
                // end of string (number) as we completely read the number
                number[index] = '\0';

                // format the number that we just read
                char *formattedNumber = formatNumber(number, argv[2][0], argv[3][0]);

                // write to our destination stream
                // write into the outputfile.
                fprintf(outputfile, "%s", formattedNumber);

                // nodejs acts asynchronously that is why when we use streams in nodejs we manually flush the buffer.
                // below line of code is not needed for synchronous operation in c.
                // c automatically flushes the buffer when its full.
                fflush(outputfile);

                // resetting. freeing memory.
                free(number);
                free(formattedNumber);

                number = (char *)malloc(10 * sizeof(char));
                index = 0;
            }
        }

        // read another character from stdin
        c = fgetc(stdin);
    }

    // close the file
    fclose(outputfile);
    exit(0);
}
