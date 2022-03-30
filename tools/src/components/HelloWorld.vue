<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action=""
      :before-upload="beforeUpload"
      :file-list="fileList"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">md5转化</div>
      </template>
    </el-upload>
    <el-button :onClick="goConfig">跳转</el-button>
  </div>
</template>

<script>
import md5 from "md5";
import { read, utils, write } from "xlsx";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    goConfig() {
      console.log("goConfig");
      this.$router.push("/config");
    },
    beforeUpload: (uploadFile) => {
      const isPhoneAvailable = ($phoneInput) => {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(String($phoneInput))) {
          return false;
        } else {
          return true;
        }
      };
      const reader = new FileReader();
      reader.readAsBinaryString(uploadFile);
      reader.onload = (e) => {
        const result = [];
        const data = e.target.result;
        const workbook = read(data, { type: "binary" });
        Object.keys(workbook.Sheets).forEach((sheet) => {
          result.push(
            // 将excel转换成json对象放入数组中
            ...utils.sheet_to_json(workbook.Sheets[sheet])
          );
        });
        const resArr = result.map((item) => {
          if (!isPhoneAvailable(item["data"])) {
            console.error("错误！！！", item["__rowNum__"], item["data"]);
          }
          return md5(item["data"]);
        });

        let sheetData = resArr.map((item) => {
          return {
            data: item,
            // __rowNum__: index,
          };
        });
        const jsonWorkSheet = utils.json_to_sheet(sheetData);
        const workBook = {
          SheetNames: ["导出结果"],
          Sheets: {
            ["导出结果"]: jsonWorkSheet,
          },
        };

        var wopts = {
          bookType: "xlsx", // 要生成的文件类型
          bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
          type: "binary",
        };

        const wbout = write(workBook, wopts);

        const s2ab = (s) => {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        };

        const blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream",
        });

        const downloadElement = document.createElement("a");
        const href = window.URL.createObjectURL(blob); // 创建下载的链接
        downloadElement.href = href;
        downloadElement.download = "download.xlsx"; // 下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); // 点击下载
        document.body.removeChild(downloadElement); // 下载完成移除元素
        window.URL.revokeObjectURL(href); // 释放掉blob对象
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
