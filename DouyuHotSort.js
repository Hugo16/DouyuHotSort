// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Hugo16
// @match        https://www.douyu.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    sort();

    function sort() {

        setTimeout(() => {
            // 获取热度
            let fHot = document.getElementsByClassName("DyListCover-hot");
            if (fHot[0].innerHTML != "") {

                // 没有列表的就不排了
                let lists = document.getElementsByClassName("layout-Cover-list");
                if (!lists[0]) {
                    return;
                }

                // 循环视频列表
                for (let i = 0; i < lists.length; i++) {
                    let arr = new Array();

                    // 循环获取每个视频的热度放进数组
                    let list = lists[i].children;
                    for (let i = 0; i < list.length; i++) {
                        let hot = list[i].getElementsByClassName("DyListCover-hot")[0].innerText;
                        if (hot.indexOf("万") != -1) {
                            hot = hot.replace(/万/, "") * 1 * 10000;
                        }
                        arr.push([list[i], hot])
                    }
                    // 排序
                    arr.sort(function (a, b) {
                        return b[1] - a[1];
                    })

                    // 清空缘来的视频列表，重新按顺序添加视频块
                    lists[i].innerHTML = "";
                    for (let j = 0; j < arr.length; j++) {
                        lists[i].appendChild(arr[j][0]);
                    }
                }
            }
            // 没有热度
            else {
                sort();
            }

        }, 10);

    }
})();
