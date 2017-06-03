#include <iostream>
#include <cassert>
using namespace std;

template <class ItemType>
class GenericSet {
    ItemType *elements;
    int len;
    int cap;

    bool contains(ItemType x);
    template <typename T>
    friend ostream& operator << (ostream&, const GenericSet<T>&);

public:
    GenericSet();
    GenericSet(ItemType);
    GenericSet(ItemType[], int);
    ~GenericSet();
    void print();
    int size() const;
    void operator << (ItemType x);
    bool operator >> (ItemType x);
    bool operator <= (GenericSet<ItemType>& other);
    bool operator < (GenericSet<ItemType>& other);
    bool operator >= (GenericSet<ItemType>& other);
    bool operator > (GenericSet<ItemType>& other);
    bool operator == (GenericSet<ItemType>& other);
    GenericSet<ItemType>& operator = (const GenericSet<ItemType>& other);
    GenericSet<ItemType> operator + (GenericSet<ItemType>& other);
    GenericSet<ItemType> operator * (GenericSet<ItemType>& other);
    GenericSet<ItemType> operator - (GenericSet<ItemType>& other);
};

template <class ItemType>
GenericSet<ItemType>::GenericSet() {
    len = 0;
    cap = 1;
    elements = new ItemType[1];
}

template <class ItemType>
GenericSet<ItemType>::GenericSet(ItemType x) {
    len = 0;
    cap = 1;
    elements = new ItemType[1];
    *this << x;
}

template <class ItemType>
GenericSet<ItemType>::GenericSet(ItemType arr[], int n) {
    len = 0;
    cap = 1;
    elements = new ItemType[1];
    for (int i = 0; i < n; i++) {
        *this << arr[i];
    }
}

template <class ItemType>
GenericSet<ItemType>::~GenericSet() {
    delete [] elements;
}

template <class ItemType>
int GenericSet<ItemType>::size() const {
    return len;
}

template <class ItemType>
bool GenericSet<ItemType>::contains(ItemType x) {
    for (int i = 0; i < size(); i++)
        if (elements[i] == x) return true;
    return false;
}

template <class ItemType>
void GenericSet<ItemType>::operator <<(ItemType x) {
    if (this->contains(x)) return;  // nu fac nimic daca e deja in multime
    if (len == cap) {               // trebuie sa aloc mai mult spatiu
        cap *= 2;
        ItemType * bigger = new ItemType[cap];
        for (int i = 0; i < len; i++) {
            bigger[i] = elements[i];
        }
        ItemType * aux;
        aux = elements;
        elements = bigger;
        delete [] aux;
    }
    // inserez elementul nou pe pozitia corecta
    int pos = 0;
    while (elements[pos] < x && pos < len) pos++;
    for (int i = len; i > pos; i--) elements[i] = elements[i-1];
    elements[pos] = x;
    len++;
}

template <class ItemType>
bool GenericSet<ItemType>::operator >>(ItemType x) {
    for (int i = 0; i < len; i++) {
        if (elements[i] == x) {
            for (int j = i; j < len - 1; j++) elements[j] = elements[j+1];
            len--;
            return true;
        }
    }
    return false;
}

template <class ItemType>
bool GenericSet<ItemType>::operator <=(GenericSet<ItemType>& other) {
    if (size() > other.size()) return false;
    for (int i = 0; i < size(); i++)
        if (!other.contains(elements[i])) return false;
    return true;
}

template <class ItemType>
bool GenericSet<ItemType>::operator <(GenericSet<ItemType>& other) {
    return *this <= other && this->size() < other.size();
}

template <class ItemType>
bool GenericSet<ItemType>::operator >=(GenericSet<ItemType>& other) {
    return other <= *this;
}

template <class ItemType>
bool GenericSet<ItemType>::operator >(GenericSet<ItemType>& other) {
    return other < *this;
}

template <class ItemType>
bool GenericSet<ItemType>::operator ==(GenericSet<ItemType>& other) {
    if (size() != other.size()) return false;
    for (int i = 0; i < size(); i++)
        if (elements[i] != other.elements[i]) return false;
    return true;
}

template <class ItemType>
GenericSet<ItemType>& GenericSet<ItemType>::operator =(const GenericSet<ItemType>& other) {
    if (this != &other) {
        delete [] elements;
        cap = other.size();
        len = 0;
        elements = new ItemType[cap];
        for (int i = 0; i < other.size(); i++) *this << other.elements[i];
    }
    return *this;
}

template <class ItemType>
GenericSet<ItemType> GenericSet<ItemType>::operator +(GenericSet<ItemType>& other) {
    GenericSet<ItemType> u;
    for (int i = 0; i < size(); i++) u << elements[i];
    for (int i = 0; i < other.size(); i++) u << other.elements[i];
    return u;
}

template <class ItemType>
GenericSet<ItemType> GenericSet<ItemType>::operator *(GenericSet<ItemType>& other) {
    GenericSet<ItemType> intersection;
    for (int i = 0; i < size(); i++)
        if (other.contains(elements[i])) intersection << elements[i];
    return intersection;
}

template <class ItemType>
GenericSet<ItemType> GenericSet<ItemType>::operator -(GenericSet<ItemType>& other) {
    GenericSet<ItemType> diff;
    for (int i = 0; i < size(); i++)
        if (!other.contains(elements[i])) diff << elements[i];
    return diff;
}


template <class ItemType>
void GenericSet<ItemType>::print() {
    cout << "{";
    for (int i = 0; i < size(); i++) {
        cout << elements[i];
        if (i != size() - 1) cout << ", ";
    }
    cout << "}\n";
}

template <typename ItemType>
ostream& operator<<(ostream& strm, const GenericSet<ItemType> &set) {
    strm << "{";
    for (int i = 0; i < set.size(); i++) {
        strm << set.elements[i];
        if (i != set.size() - 1) strm << ", ";
    }
    strm << "}";
    return strm;
}

// TESTE ///////////////////////////////////////////////////////////////////////

void test_constructors() {
    cout << "Test contructori:\n";
    GenericSet<int> a;
    cout << "GenericSet<int> a; initializeaza o multime vida de intregi\n";
    cout << "a = " << a << endl;
    GenericSet<string> b;
    cout << "GenericSet<string> b; initializeaza o multime vida de stringuri\n";
    cout << "b = " << b << endl;
    GenericSet<int> c = GenericSet<int>((int []){1,2,3,4},4);
    cout << "GenericSet<int> c = GenericSet<int>((int []){1,2,3,4},4); initializeaza o multime de intregi\n";
    cout << "c = " << c << endl;
    GenericSet<string> d = GenericSet<string>((string []){"ana", "are", "mere"}, 3);
    cout << "GenericSet<string> d = GenericSet<string>((string []){\"ana\", \"are\", \"mere\"}, 3); initializeaza o multime de stringuri\n";
    cout << "d = " << d << endl;
}

void test_assign() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){5,6,7,8},4);

    cout << "Test atribuire:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "dupa b = a\n";
    b = a;
    cout << "b = " << b << endl;
    assert(b == a);
}

void test_equals() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){5,6,7,8},4);
    GenericSet<int> c = GenericSet<int>((int []){5,6,7,8},4);

    cout << "Test egalitate:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "a == b: " << (a == b) << endl;
    assert((a == b) == false);
    cout << "b == c: " << (b == c) << endl;
    assert((b == c) == true);
}

void test_lt() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> c = GenericSet<int>((int []){1,2,3},3);
    GenericSet<int> d = GenericSet<int>((int []){4,5,6,7,8},5);

    cout << "Test incluziune stricta:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "d = " << d << endl;
    cout << "a < b: " << (a < b) << endl;
    assert((a < b) == false);
    cout << "c < a: " << (c < a) << endl;
    assert((c < a) == true);
    cout << "d < a: " << (d < a) << endl;
    assert((d < a) == false);
}

void test_leq() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> c = GenericSet<int>((int []){1,2,3},3);
    GenericSet<int> d = GenericSet<int>((int []){4,5,6,7,8},5);

    cout << "Test incluziune:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "d = " << d << endl;
    cout << "a <= b: " << (a <= b) << endl;
    assert((a <= b) == true);
    cout << "c <= a: " << (c <= a) << endl;
    assert((c <= a) == true);
    cout << "d <= a: " << (d <= a) << endl;
    assert((d <= a) == false);
}

void test_gt() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> c = GenericSet<int>((int []){1,2,3},3);
    GenericSet<int> d = GenericSet<int>((int []){4,5,6,7,8},5);

    cout << "Test incluziune stricta (dual):\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "d = " << d << endl;
    cout << "b > a: " << (b > a) << endl;
    assert((b > a) == false);
    cout << "a > c: " << (a > c) << endl;
    assert((a > c) == true);
    cout << "a > d: " << (a > d) << endl;
    assert((a > d) == false);
}

void test_geq() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> c = GenericSet<int>((int []){1,2,3},3);
    GenericSet<int> d = GenericSet<int>((int []){4,5,6,7,8},5);

    cout << "Test incluziune (dual):\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "d = " << d << endl;
    cout << "b >= a: " << (b >= a) << endl;
    assert((b >= a) == true);
    cout << "a >= c: " << (a >= c) << endl;
    assert((a >= c) == true);
    cout << "a >= d: " << (a >= d) << endl;
    assert((a >= d) == false);
}

void test_reunion() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){3,4,5,6,7,8},6);
    GenericSet<int> c;

    cout << "Test reuniune:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "dupa c = a + b\n";
    c = a + b;
    cout << "c = " << c << "\n\n";
    GenericSet<int> res = GenericSet<int>((int []){1,2,3,4,5,6,7,8},8);
    assert(c == res);

    b = GenericSet<int>();
    c = GenericSet<int>();
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "dupa c = a + b\n";
    c = a + b;
    cout << "c = " << c << endl;
    assert(c == a);
}

void test_intersection() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){3,4,5,6,7,8},6);
    GenericSet<int> c;

    cout << "Test intersectie:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "dupa c = a * b\n";
    c = a * b;
    cout << "c = " << c << "\n\n";
    GenericSet<int> res = GenericSet<int>((int []){3,4},2);
    assert(c == res);

    b = GenericSet<int>();
    c = GenericSet<int>();
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "dupa c = a * b\n";
    c = a * b;
    cout << "c = " << c << endl;
    assert(c == b);
}

void test_diff() {
    GenericSet<int> a = GenericSet<int>((int []){1,2,3,4},4);
    GenericSet<int> b = GenericSet<int>((int []){3,4,5,6,7,8},6);
    GenericSet<int> c;

    cout << "Test diferenta:\n";
    cout << "a = " << a << endl;
    cout << "b = " << b << endl;
    cout << "c = " << c << endl;
    cout << "dupa c = a - b\n";
    c = a - b;
    cout << "c = " << c << "\n\n";
    GenericSet<int> res = GenericSet<int>((int []){1,2},2);
    assert(c == res);


    cout << "dupa c = b - a\n";
    c = b - a;
    cout << "c = " << c << "\n\n";
    res = GenericSet<int>((int []){5,6,7,8},4);
    assert(c == res);
}

void test_push() {
    GenericSet<int> a, res;
    cout << "Test <<:\n";
    cout << "a = " << a << endl;
    cout << "dupa a << 1; a << 1; a << 3; a << 2;\n";
    a << 1; a << 1; a << 3; a << 2;
    cout << "a = " << a << endl;
    res = GenericSet<int>((int []){1,2,3},3);
    assert(a == res);
}

void test_pop() {
    GenericSet<int> a, res;
    a = GenericSet<int>((int []){1,2,3,4},4);
    cout << "Test >>:\n";
    cout << "a = " << a << endl;
    cout << "dupa a >> 2;\n";
    a >> 2;
    cout << "a = " << a << endl;
    res = GenericSet<int>((int []){1,3,4},3);
    assert(a == res);

    cout << "incerc iar a >> 2;\n";
    a >> 2;
    cout << "a = " << a << endl;
    res = GenericSet<int>((int []){1,3,4},3);
    assert(a == res);

    cout << "dupa a >> 1; a >> 3; a >> 4;\n";
    a >> 1; a >> 3; a >> 4;
    cout << "a = " << a << endl;
    res = GenericSet<int>();
    assert(a == res);

    cout << "din nou a >> 4;\n";
    a >> 4;
    cout << "a = " << a << endl;
    assert(a == res);
}

void test_conversion() {
    cout << "Test conversie:\n";
    GenericSet<int> a = 5;
    cout << "a = " << a << endl;
    GenericSet<int> res = GenericSet<int>((int []){5},1);
    assert(a == res);
}

////////////////////////////////////////////////////////////////////////////////

void sep() {
    cout << "\n--------------------\n\n";
}

int main(void) {
    test_constructors();
    sep();
    test_assign();
    sep();
    test_equals();
    sep();
    test_lt();
    sep();
    test_leq();
    sep();
    test_gt();
    sep();
    test_geq();
    sep();
    test_reunion();
    sep();
    test_intersection();
    sep();
    test_diff();
    sep();
    test_push();
    sep();
    test_pop();
    sep();
    test_conversion();
}
