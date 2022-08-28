var Test1;
(function (Test1) {
    Test1["one"] = "ONE";
    Test1[Test1["two"] = 2] = "two";
    Test1["three"] = "THREE";
})(Test1 || (Test1 = {}));
//enum JS에는 없고 TS에서 사용가능
//if검사나 타입 배정에 좋음
console.log(Test1);
//기본타입
//number string boolean object Array Tuple Enum Any
console.log("TEST");
