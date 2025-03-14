const products = [
    {
        id: 0,
        name: "apple",
        category: "fruit",
        price: 10,
        ratings: 99
    },
    {
        id: 1,
        name: "orange",
        category: "fruit",
        price: 5,
        ratings: 95
    },
    {
        id: 2,
        name: "grape",
        category: "fruit",
        price: 20,
        ratings: 55
    },
    {
        id: 3,
        name: "banana",
        category: "fruit",
        price: 30,
        ratings: 45
    },
    {
        id: 4,
        name: "spinach",
        category: "veggie",
        price: 7,
        ratings: 35
    },
    {
        id: 5,
        name: "potato",
        category: "veggie",
        price: 6,
        ratings: 25
    },
    {
        id: 6,
        name: "sweet potato",
        category: "veggie",
        price: 12,
        ratings: 80
    },
    {
        id: 7,
        name: "purple potato",
        category: "veggie",
        price: 10,
        ratings: 92
    },
    {
        id: 8,
        name: "cauliflower",
        category: "veggie",
        price: 15,
        ratings: 91
    },
    {
        id: 9,
        name: "onions",
        category: "veggie",
        price: 10,
        ratings: 100
    }
];

export default function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
             resolve(products);
        }, 4000)
    });
   
}