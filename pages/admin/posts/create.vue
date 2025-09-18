<template>
  <div class="p-6">
    <div class="flex justify-between">
      <h1 class="mb-4 text-2xl font-bold">新增文章</h1>

      <div>
        <UButton @click="submitArticle">發佈文章</UButton>
      </div>
    </div>

    <input
      v-model="title"
      type="text"
      placeholder="文章標題"
      class="mb-4 w-full rounded border border-gray-300 p-2"
    />

    <input
      v-model="slug"
      type="text"
      placeholder="自訂網址 (slug)"
      class="mb-4 w-full rounded border border-gray-300 p-2"
    />

    <textarea
      v-model="metaDescription"
      placeholder="Meta Description"
      class="mb-4 w-full rounded border border-gray-300 p-2"
      rows="3"
    ></textarea>

    <UModal v-model:open="showModal" title="設定圖片資訊">
      <template #body>
        <label>
          <span>Alt Text:</span>
          <input
            v-model="modalAlt"
            class="w-full rounded border border-gray-300 p-2"
          />
        </label>
        <label>
          <span>Title:</span>
          <input
            v-model="modalTitle"
            class="w-full rounded border border-gray-300 p-2"
          />
        </label>
      </template>

      <template #footer>
        <div class="flex gap-2">
          <UButton label="確定" @click="confirmImage" />
          <UButton label="取消" @click="showModal = false" />
        </div>
      </template>
    </UModal>

    <!-- Tiptap Editor -->
    <div v-if="editor" class="container">
      <div class="control-group">
        <div class="button-group">
          <button
            @click="editor.chain().focus().toggleBold().run()"
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
          >
            Bold
          </button>

          <button
            @click="editor.chain().focus().toggleItalic().run()"
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
          >
            Italic
          </button>

          <button
            @click="editor.chain().focus().toggleStrike().run()"
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
          >
            Strike
          </button>

          <!-- upload image  -->
          <button @click="triggerFileInput">Upload Image</button>
          <input
            type="file"
            @change="uploadImage"
            class="hidden"
            ref="fileInput"
          />
          <button @click="addImage">Set Image URL</button>

          <button
            @click="editor.chain().focus().toggleCode().run()"
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }"
          >
            <Icon name="i-ic:baseline-code" />
          </button>

          <button
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
          >
            Code block
          </button>

          <button
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
          >
            Paragraph
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
          >
            H1
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
          >
            H2
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
          >
            H3
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
          >
            H4
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
          >
            H5
          </button>

          <button
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
          >
            H6
          </button>

          <button
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
          >
            Bullet list
          </button>

          <button
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
          >
            Ordered list
          </button>

          <button
            @click="setLink"
            :class="{ 'is-active': editor.isActive('link') }"
          >
            Set link
          </button>

          <button
            @click="editor.chain().focus().unsetLink().run()"
            :disabled="!editor.isActive('link')"
          >
            Unset link
          </button>

          <button
            @click="editor.chain().focus().undo().run()"
            :disabled="!editor.can().chain().focus().undo().run()"
          >
            <Icon name="i-flowbite:undo-outline" />
          </button>

          <button
            @click="editor.chain().focus().redo().run()"
            :disabled="!editor.can().chain().focus().redo().run()"
          >
            <Icon name="i-flowbite:undo-solid" />
          </button>
        </div>
      </div>
      <editor-content :editor="editor" class="" />
    </div>

    <div v-html="articleContent" class="tiptap"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeUnmount } from 'vue'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import Link from '@tiptap/extension-link'

import { all, createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const lowlight = createLowlight(all)

lowlight.register('css', css)
lowlight.register('js', js)

const title = ref('')
const slug = ref('')
const metaDescription = ref('')

const editor = useEditor({
  extensions: [
    StarterKit,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    ListItem,
    BulletList,
    OrderedList,
    Link,
    Image,
  ],
  content: `
        <h2>
          Hi there,
        </h2>
        <p>
          this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
        </p>
        <ul>
          <li>
            That’s a bullet list with one …
          </li>
          <li>
            … or two list items.
          </li>
        </ul>
        <p>
          Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
        </p>

        <pre><code class="language-css">body {
  display: none;
}</code></pre>
        <p>
          I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
          Wow, that’s amazing. Good work, boy! 👏
          <br />
          — Mom
        </blockquote>
      `,
})

function setLink() {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) {
    return
  }

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  editor.value
    ?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

// 上傳圖片到後端 API
async function uploadImage(event: Event) {
  const target = event.target as HTMLInputElement | null
  const file = target && target.files ? target.files[0] : null
  if (!file) return

  const formData = new FormData()
  formData.append('file', file)

  try {
    // const res = await axios.post('/api/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' },
    // })

    // 後端傳來的 url
    // pendingImageUrl = res.data.url

    pendingImageUrl =
      'https://img2.91mai.com/o2o/image/65431ff4-7c34-49e3-9240-5d92ace16fab.jpg'
    modalAlt.value = file.name
    modalTitle.value = file.name
    showModal.value = true
  } catch (err) {
    console.error('上傳失敗', err)
    alert('圖片上傳失敗')
  } finally {
    // 清空 input.value，避免無法選同一個檔案
    if (target) target.value = ''
  }
}

function addImage() {
  const url = window.prompt('URL')

  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
}

// Modal 控制
const showModal = ref(false)
const modalAlt = ref('')
const modalTitle = ref('')
let pendingImageUrl = ''

// 觸發隱藏 input
const fileInput = ref<HTMLInputElement | null>(null)
function triggerFileInput() {
  fileInput.value?.click()
}

// Modal 確認插入圖片
function confirmImage() {
  editor.value?.commands.setImage({
    src: pendingImageUrl,
    alt: modalAlt.value,
    title: modalTitle.value,
  })
  pendingImageUrl = ''
  modalAlt.value = ''
  modalTitle.value = ''
  showModal.value = false
}

const articleContent = ref('')
async function submitArticle() {
  try {
    // const res = await axios.post('/api/posts', {
    //   title: title.value,
    //   slug: slug.value,
    //   metaDescription: metaDescription.value,
    //   content: editor.value?.getHTML(),
    // })

    articleContent.value = editor.value?.getHTML() || ''

    // navigateTo('/admin/posts')
  } catch (err: any) {
    console.error(err)
    alert('發佈失敗: ' + err.response?.data?.message || err.message)
  }
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style lang="scss" scoped>
/* Basic editor styles */
::v-deep(.tiptap) {
  :first-child {
    margin-top: 0;
  }

  padding: 2rem;

  p {
    margin-block-end: 1rem;
  }

  /* List styles */
  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: var(--purple-light);
    border-radius: 0.4rem;
    color: var(--black);
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: var(--black);
    border-radius: 0.5rem;
    color: var(--white);
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;

      white-space: pre;
      display: block;
    }

    /* Code styling */
    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #f98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #fbbc88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #b9f18d;
    }

    .hljs-title,
    .hljs-section {
      color: #faf594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70cff8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  blockquote {
    border-left: 3px solid var(--gray-3);
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid var(--gray-2);
    margin: 2rem 0;
  }

  /* Link styles */
  a {
    color: var(--purple);
    cursor: pointer;

    &:hover {
      color: var(--purple-contrast);
    }

    text-decoration: underline;
  }
}

.control-group {
  margin-bottom: 1rem;

  .button-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.25rem;
  }

  button {
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
    background: #f9fafb;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      background: #f3f4f6;
      color: #000000;
    }

    &.is-active {
      //   background: #4f46e5;
      //   border-color: #4338ca;
      color: #fff;
      background: #00c951;
      border-color: #07cb56;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
