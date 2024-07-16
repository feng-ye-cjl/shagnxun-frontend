import Home from '@/views/home/index.vue'
import Message from '@/views/message/index.vue'
import Page from '@/views/page/index.vue'
import Event from '@/views/event/index.vue'
import List from '@/views/list/index.vue'
import Formula from '@/views/formula/index.vue'
import Search from '@/views/search/index.vue'
import Dialog from '@/views/dialog/index.vue'
import Relation from '@/views/relation/index.vue'


const routes = [
    {
        path: '/',
        name: '首页',
        component: Home,
    },
    {
        path: '/message',
        name: '消息',
        component: Message
    },
    {
        path: '/page',
        name: '页面',
        component: Page
    },
    {
        path: '/event',
        name: '事件',
        component: Event
    },
    {
        path: '/list',
        name: '列表',
        component: List
    },
    {
        path: '/formula',
        name: '公式',
        component: Formula
    },
    {
        path: '/search',
        name: '模板',
        component: Search
    },
    {
        path: '/dialog',
        name: '弹框',
        component: Dialog
    },
    {
        path: '/relation',
        name: '关系',
        component: Relation
    }
]

export default routes