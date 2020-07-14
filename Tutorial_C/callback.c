#include<stdlib.h>
#include<stdio.h>
#include <time.h>
#include <unistd.h>

typedef void (*callback_ii)(int, int);
typedef void (*callback_d)(double);
typedef void (*callback_v)(void);

void callback(void (*op)(void)){op();}

void printHello(void){  
	printf("Hello World\n");
}

int main ( int argc, char **argv ) {
	callback_v op = &printHello;
	op();
while(1) {
    ParetoPrint(Report, BestSoFarPareto);
    sleep(1);
}
     return 0;
}

