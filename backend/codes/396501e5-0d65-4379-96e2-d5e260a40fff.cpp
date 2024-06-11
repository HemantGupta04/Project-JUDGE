#include <iostream>
using namespace std;

int main() {
  int n;
  cin>>n;
  for(int i=0;i<n;i++){
    int num1, num2, sum;
    cin >> num1 >> num2;
    sum = num1 + num2;
    cout<< sum<<" ";
  }
  return 0;
}