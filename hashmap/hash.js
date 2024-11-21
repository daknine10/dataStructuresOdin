import LinkedList from "./linked.js"

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this._buckets = new Array();
        this.fillBuckets();
    };

    fillBuckets() {
        for (i = 0; i > this.capacity; i++) {
            this._buckets.push(new LinkedList)
        }
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode % this.capacity;
      }

      set(key, value) {
        let index = hash(key);
        if (this._buckets[index].contains(key)) {
          this._buckets[index].modify(key, value);
          return;
        }
        if (this._buckets[index].head === null) {
            this._buckets[index].append(key, value);
        }
      }

      get(key) {
        let index = hash(key);
        if (this._buckets[index].contains(key)) {
          return this._buckets[index].getValue(key)
        }
        return null;   
      }
      
      has(key) {
        let index = hash(key);
        if (this._buckets[index].contains(key)) {
          return true;
        }
        return false;
      }

      remove(key) {
        let index = hash(key);
        if (this._buckets[index].contains(key)) {
          this._buckets[index].removeAt(find(key));
        }
        return false;
      }

      length() {
        let length = 0
        for (let list of this._buckets) {
          length += list.size();
        }
        return length
      }

      clear() {
        this.fillBuckets();
      }
}
