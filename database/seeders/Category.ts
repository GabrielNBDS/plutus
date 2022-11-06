import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from 'App/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { id: 1, icon: 'icon-park-outline:paper-money-two' },
      { id: 2, icon: 'icon-park-outline:knife-fork' },
      { id: 3, icon: 'icon-park-outline:party-balloon' },
      { id: 4, icon: 'icon-park-outline:coat-hanger' },
      { id: 5, icon: 'icon-park-outline:heart-rate' },
      { id: 6, icon: 'icon-park-outline:foundation-makeup' },
      { id: 7, icon: 'icon-park-outline:shopping-cart-one' },
      { id: 8, icon: 'icon-park-outline:plug-one' },
      { id: 9, icon: 'icon-park-outline:car' },
      { id: 10, icon: 'icon-park-outline:home' },
      { id: 11, icon: 'icon-park-outline:book-open' },
      { id: 12, icon: 'icon-park-outline:gift' },
      { id: 13, icon: 'icon-park-outline:briefcase' },
      { id: 14, icon: 'icon-park-outline:tv' },
      { id: 15, icon: 'icon-park-outline:iphone' },
      { id: 16, icon: 'icon-park-outline:sport' },
      { id: 17, icon: 'icon-park-outline:airplane' },
      { id: 18, icon: 'icon-park-outline:family' },
      { id: 19, icon: 'icon-park-outline:dog' },
      { id: 20, icon: 'icon-park-outline:chart-pie' },
    ])
  }
}
