# jiabeng

Jason 的版本更新
打算重刻，因為大改幾乎跟重刻一樣了
所以從2018.01.10開始紀錄

index.html=進版圖
list.html=選店家圖
confirm.html=確認頁面
order.html=菜單頁面（訂購頁面）
result.html=訂購結果頁面（還沒做）

v1.0.0
index.html按照視覺稿完成，GG確認過，表示滿意。
list.html按照wireframe刻。

2018.01.10

v1.0.1 
拯救RWD，讓RWD能正常運作

2018.01.10

v1.0.2
營業時間排版

2018.01.10

v1.1.0
confirm.html按照wireframe刻。

2018.01.10

v1.1.1
confirm.html內補上 <script>

2018.01.10

v1.2.0
result.html按照wireframe刻。
金額那個選項再確認

2018.01.15

-----------------

切版的使用說明書  by Jason

切版使用到的架構
1.bootstrap 4.0.0-beta.2（以下簡稱BS4）
2.導入fa awesome（放大鏡、分享）

BS4使用的功能
1.大量使用flex
2.list.html使用了grid system
3.<992px使用的放大鏡縮放搜尋列可以參考BS4「導覽列 (Navbar)」最下方的「外部內容」，其中<div class="collapse">...</div>需要獨立出來才會向下延伸，不然原本是向上延伸
4.了解BS4的斷點使用
5.使用text-center

其他輔助工具
prepros-寫SCSS

翻轉卡片功能使用了
transform：rotateY(180deg)
<!-- Y軸翻轉180deg -->
perspective: 1000;
<!-- 透視距離，即你與螢幕的距離 -->
transform-style：preserve-3d;
<!-- 使transform為3D -->
backface-visibility: hidden;
<!-- 翻到背面的元素不可視 -->
這部分需要去了解，才有辦法做出