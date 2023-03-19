// const temp = [
//   { id: 1, name: "홍길동", age: 20 },
//   { id: 2, name: "고길동", age: 30 },
//   { id: 3, name: "둘리", age: 10 },
//   { id: 4, name: "햄토리", age: 40 },
//   { id: 5, name: "루피", age: 50 },
// ];

// const newArr = temp.map((item, index) => {
//   return item.id;
// });

// console.log(newArr);
// console.log(temp);

const patchData = [
  { userId: 1 },
  { userName: "Rebekah Johnson" },
  { postingId: 1 },
  { postingTitle: "간단한 HTTP API 개발 시작!" },
  { postingContent: "노드" },
];

const newArr = patchData.map((item, index) => {
  return item.userId;
});

console.log(patchData);
console.log(newArr);
