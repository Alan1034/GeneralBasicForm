<!-- @format -->

<!--
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-09-05 16:09:07
 * @LastEditTime: 2024-09-05 17:11:51
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 制作遮罩层图片打碎与重组循环动画
 * @FilePath: \GeneralBasicForm\src\components\CustomCom\img-mask\index.vue
 * 
-->
<!-- @format -->

<template>
  <canvas ref="loadingCanvas"></canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
const loadingCanvas = ref() as any
const { imgSrc } = defineProps<{ imgSrc: string }>();
onMounted(() => {
  const img = new Image();
  const pieces = [];
  const piecesX = 8; // Number of horizontal pieces
  const piecesY = 8; // Number of vertical pieces
  let pieceHeight = 0;
  let pieceWidth = 0;
  const shatterAngle = 300; //
  const canvas = loadingCanvas.value;
  const ctx = canvas.getContext('2d');
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    pieceWidth = Math.floor(img.width / piecesX);
    pieceHeight = Math.floor(img.height / piecesY);
    shatterImage();
    animate(); // 开始对碎片的动画处理
  };
  img.src = imgSrc;
  const shatterImage = () => {
    for (let i = 0; i < piecesY; i++) {
      for (let j = 0; j < piecesX; j++) {
        pieces.push({
          x: pieceWidth * j,
          y: pieceHeight * i,
          offsetX: (Math.random() - 0.5) * shatterAngle,
          offsetY: (Math.random() - 0.5) * shatterAngle
        });
      }
    }
  }
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let renderFinish = true
    pieces.forEach((piece, index) => {
      ctx.drawImage(img, piece.x, piece.y, pieceWidth, pieceHeight, piece.x + piece.offsetX, piece.y + piece.offsetY, pieceWidth, pieceHeight);
      // Gradually reposition pieces to original position
      if (Math.abs(piece.offsetX) > 0.5) {
        renderFinish = false
        piece.offsetX *= 0.95;
      }
      if (Math.abs(piece.offsetY) > 0.5) {
        piece.offsetY *= 0.95;
        renderFinish = false
      }
    });
    if (renderFinish) {
      setTimeout(() => {
        shatterImage();
        animate();
      }, 300);
    } else {
      requestAnimationFrame(animate);
    }

  }
})
</script>
