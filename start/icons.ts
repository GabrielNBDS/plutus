import { addCollection, edgeIconify } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
import { icons as iconPark } from '@iconify-json/icon-park-outline'
import View from '@ioc:Adonis/Core/View'

View.use(edgeIconify)
addCollection(heroIcons)
addCollection(iconPark)
