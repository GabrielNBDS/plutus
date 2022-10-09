import { addCollection, edgeIconify } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
import View from '@ioc:Adonis/Core/View'

View.use(edgeIconify)
addCollection(heroIcons)
