import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Category from '../../app/Models/Category'

export default class extends BaseSeeder {
  public async run() {
    await Category.createMany([
      { name: 'Pagamento', icon: 'icon-park-outline:paper-money-two' },
      { name: 'Bares e restaurantes', icon: 'icon-park-outline:knife-fork' },
      { name: 'Lazer', icon: 'icon-park-outline:party-balloon' },
      { name: 'Vestuário', icon: 'icon-park-outline:coat-hanger' },
      { name: 'Saúde', icon: 'icon-park-outline:heart-rate' },
      { name: 'Cuidados pessoais', icon: 'icon-park-outline:foundation-makeup' },
      { name: 'Mercado', icon: 'icon-park-outline:shopping-cart-one' },
      { name: 'Eletrônicos', icon: 'icon-park-outline:plug-one' },
      { name: 'Transporte', icon: 'icon-park-outline:car' },
      { name: 'Moradia', icon: 'icon-park-outline:home' },
      { name: 'Educação', icon: 'icon-park-outline:book-open' },
      { name: 'Presentes', icon: 'icon-park-outline:gift' },
      { name: 'Despesas de trabalho', icon: 'icon-park-outline:briefcase' },
      { name: 'Assinaturas e serviços', icon: 'icon-park-outline:tv' },
      { name: 'Telefones', icon: 'icon-park-outline:iphone' },
      { name: 'Esportes', icon: 'icon-park-outline:sport' },
      { name: 'Viagens', icon: 'icon-park-outline:airplane' },
      { name: 'Família', icon: 'icon-park-outline:family' },
      { name: 'Animais de estimação', icon: 'icon-park-outline:dog' },
      { name: 'Outros', icon: 'icon-park-outline:chart-pie' },
    ])
  }
}
