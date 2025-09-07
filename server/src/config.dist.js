export default {
    // 启动端口
    port: 9010,

    // 设置为 true，会允许所有跨域访问。
    // 设置为 [urls]，仅对数组内的地址允许跨域访问。
    origin: true,

    // showDoc 部署地址。
    showDocUrl: "http://<server>/showdoc",

    // 加载哪些 ShowDoc 项目。
    // 项目ID：打开任意一个项目，看网址：http://<server>/showdoc/web/#/<ID>
    showDocProjects: [1,2],
};
