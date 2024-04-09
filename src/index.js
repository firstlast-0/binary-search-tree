// import './style.css';

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

function node() {
    this.data = null;
    this.left = null;
    this.right = null;

    return { data, left, right };
}

function tree(array) {
    this.root = buildTree(array);

    function buildTree(array) {
        let set = new Set(array);
        array = [];
        for (let item of set) array.push(item);
        array.sort((a, b) => a - b);

        return buildBst(array, 0, array.length - 1);
        function buildBst(array, start, end) {
            if (start > end) return null;
            let mid = Math.trunc((start + end) / 2);
            let root = node();
            root.data = array[mid];

            root.left = buildBst(array, start, mid - 1);
            root.right = buildBst(array, mid + 1, end);
            return root;
        }
    }

    function insert(value) {
        let ptr = this.root;

        while (ptr) {
            if (value < ptr.data && ptr.left === null) {
                let item = node();
                item.data = value;
                ptr.left = item;
                return;
            } else if (value > ptr.data && ptr.right === null) {
                let item = node();
                item.data = value;
                ptr.right = item;
                return;
            } else if (value < ptr.data) ptr = ptr.left;
            else if (value > ptr.data) ptr = ptr.right;
            else {
                console.log('Duplicate value');
                return;
            }
        }
    }

    function deleteItem(value) {
        let ptr = this.root;
        while (true) {
            if (value < ptr.data) {
                if (ptr.left.data === value) {
                    if (ptr.left.left === null && ptr.left.right === null) {
                        ptr.left = null;
                    } else if (ptr.left.left && ptr.left.right) {
                        let ptr2 = ptr.left.right;
                        while (ptr2.left) ptr2 = ptr2.left;
                        deleteItem(ptr2.data);
                        ptr.left.data = ptr2.data;
                    } else {
                        ptr.left = ptr.left.left ? ptr.left.left : ptr.left.right;
                    }
                    return;
                }
                ptr = ptr.left;
            } else if (value > ptr.data) {
                if (ptr.right.data === value) {
                    if (ptr.right.left === null && ptr.right.right === null) {
                        ptr.right = null;
                        return;
                    } else if (ptr.right.left && ptr.right.right) {
                        let ptr2 = ptr.right.right;
                        while (ptr2.left) ptr2 = ptr2.left;
                        deleteItem(ptr2.data);
                        ptr.right.data = ptr2.data;
                        return;
                    } else {
                        ptr.right = ptr.right.left ? ptr.right.left : ptr.right.right;
                        return;
                    }
                }
                ptr = ptr.right;
            } else {
                if (ptr.left === null && ptr.right === null) {
                    this.root = null;
                } else if (ptr.left && ptr.right) {
                    let ptr2 = ptr.right;
                    while (ptr2.left) ptr2 = ptr2.left;
                    deleteItem(ptr2.data);
                    ptr.data = ptr2.data;
                } else {
                    this.root = ptr.left ? ptr.left : ptr.right;
                }
                return;
            }
        }
    }

    function find(value) {
        let ptr = this.root;
        while (true) {
            if (value < ptr.data) {
                ptr = ptr.left;
            } else if (value > ptr.data) {
                ptr = ptr.right;
            } else {
                return ptr;
            }
        }
    }

    function levelOrder(callback) {        
        let ptr = this.root;
        let array = [];
        let queue = [];

        queue.push(ptr);
        while (queue.length !== 0) {
            if (callback) {
                callback(queue[0])
            } else {
                array.push(queue[0].data);
            }
            
            if (queue[0].left) queue.push(queue[0].left);
            if (queue[0].right) queue.push(queue[0].right);
            queue.shift();
        }
        return array;
        
    }

    return { root, buildTree, insert, deleteItem, find, levelOrder };
}

let bst = tree([1]);
// [1, 2, 3, 4, 5, 6, 7];
// bst.insert(1000);
// bst.deleteItem(2);
// bst.deleteItem(6);
// console.log(bst.root)
prettyPrint(bst.root);
console.log(bst.levelOrder());

// let bst = tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

function sum() {
    
}