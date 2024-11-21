class LinkedList {
    constructor(head) {
        this.head = null;
    }

    append(value) {
        if (this.head === null) return this.head = new Node(value);
        let tmp = this.head

        while (tmp.next !== null) {
            tmp = tmp.next
        }

        tmp.next = new Node(value);
    }

    prepend(value) {
        if (this.head === null) return this.head = new Node(value);

        let tmp = this.head;
        this.head = new Node(value, tmp)
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

    contains(value) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.value === value) return true;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            if (tmp.next.value === value) return true;
            tmp = tmp.next;
        }
        return false;
    }

    find(value) {
        if (this.head === null) throw Error("List is empty");
        if (this.head.value === value) return 0;
        let i = 0;
        let tmp = this.head;
        
        while (tmp.next !== null) {
            i++;
            if (tmp.next.value === value) return i - 1;
            tmp = tmp.next;
        }
        return null;
    }

    toString() {
        if (this.head === null) throw Error("List is empty");
        let tmp = this.head;
        let values = [`( ${tmp.value} )`];

        while (tmp !== null) {
            if (tmp.next === null) {
                values.push("null")
                break;
            }
            values.push(`( ${tmp.next.value} )`);
            tmp = tmp.next;
        }
        return values.join(" -> ")
    }

    insertAt(value, index) {
        if (this.head === null) throw Error("List is empty");
        if (this.size() - 1 === index) return this.append(value)
        if (this.size() - 1 < index) throw Error("List is not big enough");

        let prev = null
        let current = this.head;

        for (let i = 0; i < index; i++) {
            prev = current;
            current = current.next;
        }

        prev.next = new Node(value, current);
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
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

}

export default LinkedList;