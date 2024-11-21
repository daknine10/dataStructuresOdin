class LinkedList {
    constructor(head) {
        this.head = null;
    }

    append(key, value = null) {
        if (this.head === null) return this.head = new Node(key, value);
        let tmp = this.head

        while (tmp.next !== null) {
            tmp = tmp.next
        }

        tmp.next = new Node(key, value);
    }

    prepend(key, value = null) {
        if (this.head === null) return this.head = new Node(key, value);

        let tmp = this.head;
        this.head = new Node(key, value, tmp)
    }

    modify(key, value) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.key === key) return this.head.value = value;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            if (tmp.next.key === key) return tmp.next.value = value;
            tmp = tmp.next;
        }
        return null;
    }

    size() {
        if (this.head === null) return 0

        let tmp = this.head;
        let count = 1;
        while (tmp.next !== null) {
            count++;
            tmp = tmp.next
        }
        return count;
    }

    getHead = () => {return this.head};

    getTail = () => {
        if (this.head === null) throw Error("List is empty");
        let tmp = this.head;

        while (tmp.next !== null) {
            tmp = tmp.next
        }
        return tmp;
    }

    at(index) {
        if(this.size() - 1 < index) throw Error("List is not big enough");
        let i = 0;
        let tmp = this.head;

        while (i - 1 !== index) {
            i++;
            tmp = tmp.next
        }

        return tmp;
    }

    pop() {
        if (this.head === null) throw Error("List is empty");
        let prev = null
        let current = this.head;

        while (current.next !== null) {
            prev = current;
            current = current.next;
        }

        prev.next = null;
    }

    contains(key) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.key === key) return true;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            if (tmp.next.value === key) return true;
            tmp = tmp.next;
        }
        return false;
    }

    find(key) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.key === key) return 0;
        let i = 0;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            i++;
            if (tmp.next.key === key) return i - 1;
            tmp = tmp.next;
        }
        return null;
    }

    getValue(key) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.key === key) return this.head.value;
        let i = 0;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            i++;
            if (tmp.next.key === key) return tmp.next.value;
            tmp = tmp.next;
        }
        return null;
    }

    toString() {
        if (this.head === null) throw Error("List is empty");
        let tmp = this.head;
        let values = [`( ${tmp.key} : ${tmp.value} )`];

        while (tmp !== null) {
            if (tmp.next === null) {
                values.push("null")
                break;
            }
            values.push(`( ${tmp.next.key} : ${tmp.next.value} )`);
            tmp = tmp.next;
        }
        return values.join(" -> ")
    }

    insertAt(key, value, index) {
        if (this.head === null) throw Error("List is empty");
        if (this.size() - 1 === index) return this.append(key, value)
        if (this.size() - 1 < index) throw Error("List is not big enough");

        let prev = null
        let current = this.head;

        for (let i = 0; i < index; i++) {
            prev = current;
            current = current.next;
        }

        prev.next = new Node(key, value, current);
    }

    removeAt(index) {
        if (this.head === null) throw Error("List is empty");
        if (this.size() - 1 < index) throw Error("List is not big enough");

        let prev = null
        let current = this.head;

        for (let i = 0; i < index; i++) {
            prev = current;
            current = current.next;
        }

        prev.next = current.next;
    }
};

class Node {
    constructor(key, value = null, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }

}

export default LinkedList;