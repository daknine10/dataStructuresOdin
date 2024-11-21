import LinkedList from "./linked.js"

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this._buckets = null;
        this.fillBuckets();
    };

    fillBuckets() {
      this._buckets = new Array()
      for (let i = 0; i < this.capacity; i++) {
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
      let index = this.hash(key);
      if (this._buckets[index].contains(key)) {
        this._buckets[index].modify(key, value);
        return;
      }
      this._buckets[index].append(key, value);
      if (this._checkCapacity() > Math.floor(this.capacity * this.loadFactor)) {
        this._extendBucket();
      }
    }

    get(key) {
      let index = this.hash(key);
      if (this._buckets[index].contains(key)) {
        return this._buckets[index].getValue(key)
      }
      return null;   
    }
    
    has(key) {
      let index = this.hash(key);
      if (this._buckets[index].contains(key)) {
        return true;
      }
      return false;
    }

    remove(key) {
      let index = this.hash(key);
      if (this._buckets[index].contains(key)) {
        this._buckets[index].removeAt(this._buckets[index].find(key));
        return true
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

    keys() {
      let keys = []
      for (let list of this._buckets) {
        keys.push(list.getKeysArray())
      }
      return keys
    }

    values() {
      let values = []
      for (let list of this._buckets) {
        values.push(list.getValuesArray())
      }
      return values
    }

    entries() {
      let values = []
      for (let list of this._buckets) {
        values.push(list.getEntriesArray())
      }
      return values
    }

    _extendBucket() {
      let tmpBucket = this.entries();
      this.capacity *= 2;
      this.fillBuckets();

      for (let list of tmpBucket) {
        if (list !== null) {
          for (let node of list) {
            this.set(node[0], node[1])
          }
        }
      }
    }

    _checkCapacity() {
      let size = this.capacity;
      for (let list of this._buckets) {
        if (list.head === null) size -= 1
      }
      return size
    }
}

const test = new HashMap()
test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('monkey', 'brain')
test.set('lion', 'roar')
test.remove('monkey')

console.log(test.entries())