<template>
    <div>
        <div
            class="quill-editor"
            v-model="content"
            @change="onEditorChange($event)"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @ready="onEditorReady($event)"
            v-quill:myQuillEditor="editorOption"
        ></div>
    </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
    ['blockquote', 'code-block'], // 引用  代码块
    [{ header: 1 }, { header: 2 }], // 1、2 级标题
    [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
    [{ script: 'sub' }, { script: 'super' }], // 上标/下标
    [{ indent: '-1' }, { indent: '+1' }], // 缩进
    // [{'direction': 'rtl'}],                         // 文本方向
    [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
    [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
    [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
    [{ font: [] }], // 字体种类
    [{ align: [] }], // 对齐方式
    ['clean'], // 清除文本格式
    ['link', 'image', 'video'] // 链接、图片、视频
]

export default {
    props: {
        /*编辑器的内容*/
        value: {
            type: String
        }
    },

    data() {
        return {
            content: this.value,
            editorOption: {
                // some quill options
                modules: {
                    toolbar: [
                        ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
                        ['blockquote', 'code-block'], // 引用  代码块
                        [{ header: 1 }, { header: 2 }], // 1、2 级标题
                        // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                        // [{ script: "sub" }, { script: "super" }], // 上标/下标
                        // [{ indent: "-1" }, { indent: "+1" }], // 缩进
                        // [{'direction': 'rtl'}],                         // 文本方向
                        // [{ size: ["small", false, "large", "huge"] }], // 字体大小
                        // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
                        [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                        // [{ font: [] }], // 字体种类
                        // [{ align: [] }], // 对齐方式
                        // ["clean"], // 清除文本格式
                        ['link', 'image', 'video'] // 链接、图片、视频
                    ]
                }
            }
        }
    },

    methods: {
        onEditorBlur(editor) {
            //失去焦点事件
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            //获得焦点事件
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            //内容改变事件
            // console.log('editor change!', editor, html, text)
            console.log('editor change!', html)
            this.content = html
        }
    }
}
</script> 