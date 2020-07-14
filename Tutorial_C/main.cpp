#include <iostream>
#include <String>
#include <stdio.h>
#include "info.h"

using namespace std;

class Animal {
public:
  string name;
  Animal(){
    name = "Satania";
  }
  void walk(){
    cout<<"Walking"<<endl;
  }
};
class Dog : public Animal{
public:
  void walk(){
    cout<< this->name + " Barking"<<endl;
  }
};

void tmp1(){
  printf("Pointer of Array\n");
  int* ptr = new int[100];
  ptr[0] = 10;
  ptr[1] = 20;
  ptr[2] = 30;
  printf("%d\t%d\t%d\n", ptr[0],ptr[1],ptr[2]);
  printf("%d\t%d\t%d\n", ptr,ptr+1,ptr+2);
  printf("%d\t%d\t%d\n", *ptr,*(ptr+1),*(ptr+2));
  printf("%d\t%d\t%d\n", *ptr,*(ptr+sizeof(int)),*(ptr+2*sizeof(int)));
};

void bsearch(int arr[], int search){
    int first, middle, last;

    first = 0;
  	last = 100;
  	middle = (first+last)/2 ;

    while (first <= last){
  		if(arr[middle] < search)
  			first = middle + 1;
  		else if(arr[middle] == search){
  			cout<<search<<" found at location "<<middle+1<<"\n";
  			break;
  		}
  		else
  			 last = middle - 1;
  		middle = (first + last)/2;
  	}
  	if(first > last)
  		cout<<"Not found! "<<search<<" is not present in the list.";
}

void swap(int i,int j, int *a){
    int temp = a[i];
    a[i] = a[j];
    a[j] = temp;
}


void quicksort(int *arr, int left, int right){
    int min = (left+right)/2;
    cout<<"QS:"<<left<<","<<right<<"\n";

    int i = left;
    int j = right;
    int pivot = arr[min];

    while(left<j || i<right)
    {
        while(arr[i]<pivot)        i++;
        while(arr[j]>pivot)        j--;
        if(i<=j){
            swap(i,j,arr);
            i++;
            j--;
        }
        else{
            if(left<j)   quicksort(arr, left, j);
            if(i<right)  quicksort(arr,i,right);
            return;
        }
    }
}

void qsdemo(){
  int arr[8] = {110, 5, 10,3 ,22, 100, 1, 23};
  quicksort(arr, 0, (sizeof(arr)/sizeof(arr[0]))-1);
}
int g_int = 0;
void changePtr(int** pInt){
*pInt = &g_int;
}
void main(){
int localInt = 1;
int* localPInt = &localInt;
changePtr(&localPInt);
printf("%d\n", *localPInt);
}
int main(void) {
   Dog tom;
   tom.walk();
   Animal tony;
   tony.walk();
   int arr[100];
   for (size_t i = 0; i < 100; i++)    arr[i] = i;
   for (size_t j = 0; j < 100; j++)    printf("%d\n", arr[j]);
   bsearch(arr, 20);

	printf("My name is %s\nMy age is %d", NAME,AGE);
   return 0;
};
