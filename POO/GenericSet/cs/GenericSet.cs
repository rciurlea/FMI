using System;
using System.Collections.Generic;

namespace cs {
    class GenericSet<T> {
        private List<T> elements;

        // Constructor implicit
        public GenericSet() : this(Array.Empty<T>()) {}

        // Constructor de copiere
        public GenericSet(GenericSet<T> other) : this(other.elements.ToArray()) {}

        // Constructor de initializare din vector
        public GenericSet(T[] arr) {
            elements = new List<T>();
            foreach (T item in arr) {
                AddItem(item);
            }
        }

        // Operator de conversie. Permite coversia unui element de tipul multimii intr-o
        // multime care contine doar acel element.
        public static implicit operator GenericSet<T>(T item) {
            return new GenericSet<T>(new T[]{item});
        }

        // helper
        private void AddItem(T item) {
            if (!elements.Contains(item)) elements.Add(item);
        }

        public int Cardinal {
            get => elements.Count;
        }

        // Reuniunea a doua multimi. A = {1,2}, B = {1,4,5}, A + B = {1,2,4,5}
        public static GenericSet<T> operator +(GenericSet<T> first, GenericSet<T> second) {
            var result = new GenericSet<T>();
            foreach (T item in first.elements) {
                result.AddItem(item);
            }
            foreach (T item in second.elements) {
                result.AddItem(item);
            }
            return result;
        }

        // Intersectia a doua multimi. A = {1,2,3}, B = {1,3,4,5}, A * B = {1,3}
        public static GenericSet<T> operator *(GenericSet<T> first, GenericSet<T> second) {
            var result = new GenericSet<T>();
            foreach (T item in first.elements) {
                if (second.elements.Contains(item))
                    result.AddItem(item);
            }
            return result;
        }

        // Difrenta a doua multimi. A = {1,2,3}, B = {1,3,4,5}, B - A = {4,5}
        public static GenericSet<T> operator -(GenericSet<T> first, GenericSet<T> second) {
            var result = new GenericSet<T>();
            foreach (T item in first.elements) {
                if (!second.elements.Contains(item))
                    result.AddItem(item);
            }
            return result;
        }

        // Incluziune. A = {1,2}, B = {1,2,3,4}. Atunci A < B
        public static bool operator <=(GenericSet<T> first, GenericSet<T> second) {
            foreach (T item in first.elements)
                if (!second.elements.Contains(item)) return false;
            return true;
        }
        
        // Incluziune stricta
        public static bool operator <(GenericSet<T> first, GenericSet<T> second) =>
            first.elements.Count < second.elements.Count && first <= second;
        
        // Incluziune stricta
        public static bool operator >(GenericSet<T> first, GenericSet<T> second) =>
            first.elements.Count > second.elements.Count && first >= second;

        // Incluziune. A = {1,2}, B = {1,2,3,4}. Atunci B >= A
        public static bool operator >=(GenericSet<T> first, GenericSet<T> second) =>
            second <= first;            

        // Egalitatea. Elementele nu trebuie sa fie in aceeasi ordine.
        public static bool operator ==(GenericSet<T> first, GenericSet<T> second) =>
            first <= second && second <= first;

        public static bool operator !=(GenericSet<T> first, GenericSet<T> second) =>
            !(first == second);

        // override object.Equals
        public override bool Equals (object obj) {
            if (obj == null || GetType() != obj.GetType()) {
                return false;
            }
            
            var that = (GenericSet<T>)obj;
            return this <= that && that <= this;
        }
        
        // override object.GetHashCode
        public override int GetHashCode() =>
            elements.GetHashCode();

        // override object.ToString
        public override string ToString() {
            var sarr = new string[elements.Count];
            for (int i = 0; i < elements.Count; i++) {
                sarr[i] = elements[i].ToString();
            }
            return "{" + String.Join(", ", elements) + "}";
        }
    }
}