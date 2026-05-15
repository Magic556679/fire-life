<template>
  <div class="container mx-auto pt-14">
    <div class="flex justify-between">
      <h1 class="mb-4 text-2xl font-bold">編輯文章</h1>

      <div>
        <UButton @click="submitArticle">更新文章</UButton>
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
      placeholder="文章網址 Slug (選填)"
      class="mb-4 w-full rounded border border-gray-300 p-2"
    />
    <input
      v-model="metaDescription"
      type="text"
      placeholder="Meta Description (選填)"
      class="mb-4 w-full rounded border border-gray-300 p-2"
    />

    <!-- 封面圖 -->
    <div class="mb-4">
      <p class="mb-1 text-sm font-medium text-gray-700">封面圖</p>
      <div
        v-if="coverImageUrl"
        class="relative w-full overflow-hidden rounded border border-gray-200"
      >
        <img
          :src="coverImageUrl"
          alt="封面圖預覽"
          class="h-48 w-full object-cover"
        />
        <button
          type="button"
          class="absolute top-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white hover:bg-black/70"
          @click="removeCoverImage"
        >
          移除
        </button>
      </div>
      <label
        v-else
        class="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 text-sm text-gray-400 hover:border-gray-400"
      >
        <span v-if="coverImageUploading">上傳中...</span>
        <span v-else>點擊上傳封面圖</span>
        <input
          ref="coverImageInput"
          type="file"
          accept="image/*"
          class="hidden"
          @change="handleCoverImageUpload"
        />
      </label>
    </div>

    <!-- 做成元件 -->
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
        <div class="button-group mb-4">
          <button
            :disabled="!editor.can().chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            @click="editor.chain().focus().toggleBold().run()"
          >
            Bold
          </button>

          <button
            :disabled="!editor.can().chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            @click="editor.chain().focus().toggleItalic().run()"
          >
            Italic
          </button>

          <button
            :disabled="!editor.can().chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            @click="editor.chain().focus().toggleStrike().run()"
          >
            Strike
          </button>

          <!-- upload image  -->
          <button @click="triggerFileInput">Upload Image</button>
          <input
            ref="fileInput"
            type="file"
            class="hidden"
            @change="handleUploadImage"
          />
          <button @click="addImage">Set Image URL</button>

          <button
            :disabled="!editor.can().chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }"
            @click="editor.chain().focus().toggleCode().run()"
          >
            <Icon name="i-ic:baseline-code" />
          </button>

          <button
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()"
          >
            Code block
          </button>

          <button
            :class="{ 'is-active': editor.isActive('paragraph') }"
            @click="editor.chain().focus().setParagraph().run()"
          >
            Paragraph
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          >
            H1
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          >
            H2
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          >
            H3
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
          >
            H4
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
          >
            H5
          </button>

          <button
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
          >
            H6
          </button>

          <button
            :class="{ 'is-active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()"
          >
            Bullet list
          </button>

          <button
            :class="{ 'is-active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()"
          >
            Ordered list
          </button>

          <button
            :class="{ 'is-active': editor.isActive('link') }"
            @click="setLink"
          >
            Set link
          </button>

          <button
            :disabled="!editor.isActive('link')"
            @click="editor.chain().focus().unsetLink().run()"
          >
            Unset link
          </button>

          <button
            :disabled="!editor.can().chain().focus().undo().run()"
            @click="editor.chain().focus().undo().run()"
          >
            <Icon name="i-flowbite:undo-outline" />
          </button>

          <button
            :disabled="!editor.can().chain().focus().redo().run()"
            @click="editor.chain().focus().redo().run()"
          >
            <Icon name="i-flowbite:undo-solid" />
          </button>
        </div>
        <div class="button-group">
          <button
            @click="
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            "
          >
            Insert table
          </button>

          <button @click="editor.chain().focus().deleteTable().run()">
            Delete table
          </button>
          <button @click="editor.chain().focus().mergeOrSplit().run()">
            Merge or split
          </button>
          <button @click="editor.chain().focus().addRowAfter().run()">
            Add row after
          </button>
          <button @click="editor.chain().focus().deleteRow().run()">
            Delete row
          </button>
          <button @click="editor.chain().focus().addColumnAfter().run()">
            Add column after
          </button>
          <button @click="editor.chain().focus().deleteColumn().run()">
            Delete column
          </button>
        </div>
      </div>
      <editor-content :editor="editor" class="border border-gray-300" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { getPost, updatePost } from '~/api/posts/index'
import { uploadImage } from '~/api/upload/index'
import type { Post, ApiResponse } from '~/api/posts/types'

import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import js from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

definePageMeta({
  layout: 'admin',
})

const route = useRoute()
const id = Number(route.params.id)

const { data } = useAsyncData<ApiResponse<Post>>('post', () => getPost(id))

const lowlight = createLowlight(all)

lowlight.register('css', css)
lowlight.register('js', js)

const title = ref('')
const slug = ref('')
const metaDescription = ref('')
const coverImageUrl = ref<string | null>(null)
const coverImageUploading = ref(false)
const coverImageInput = ref<HTMLInputElement | null>(null)

async function handleCoverImageUpload(event: Event) {
  const target = event.target as HTMLInputElement | null
  const file = target?.files?.[0]
  if (!file) return
  coverImageUploading.value = true
  try {
    const { data } = await uploadImage(file)
    coverImageUrl.value = data.url
  } catch {
    alert('封面圖上傳失敗')
  } finally {
    coverImageUploading.value = false
    if (target) target.value = ''
  }
}

function removeCoverImage() {
  coverImageUrl.value = null
}

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      codeBlock: false,
    }),
    CodeBlockLowlight.configure({ lowlight }),
    Image,
    TableKit.configure({
      table: { resizable: false },
    }),
  ],
  content: '',
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
async function handleUploadImage(event: Event) {
  const target = event.target as HTMLInputElement | null
  const file = target && target.files ? target.files[0] : null
  if (!file) return

  try {
    const { data } = await uploadImage(file)

    pendingImageUrl = data.url
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

async function submitArticle() {
  try {
    const { status } = await updatePost(id, {
      title: title.value,
      slug: slug.value,
      meta_description: metaDescription.value,
      content: editor.value?.getHTML() || '',
      og_image: coverImageUrl.value,
    })

    if (status) {
      navigateTo('/admin/posts')
    }
  } catch (err) {
    console.error(err)
    alert('發佈失敗: ' + (err instanceof Error ? err.message : '未知錯誤'))
  }
}

watchEffect(async () => {
  if (data.value?.data?.content && editor.value) {
    await nextTick()
    editor.value.commands.setContent(data.value.data.content)
    console.log('data', data.value)
    title.value = data.value.data.title
    slug.value = data.value.data.slug || ''
    metaDescription.value = data.value.data.meta_description || ''
    coverImageUrl.value = data.value.data.og_image || null
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>
