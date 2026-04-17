import { MenuData } from '@/types/menu';

export const defaultMenu: MenuData = {
  updatedAt: new Date().toISOString(),
  sections: [
    {
      id: 'bebidas',
      name: 'Bebidas',
      icon: '🍺',
      type: 'with-botana',
      items: [
        { id: 'agua-mineral', name: 'Agua mineral', price: 30, priceWithBotana: 45, available: true },
        { id: 'refresco-600', name: 'Refresco de 600 ml', price: 30, priceWithBotana: 50, available: true },
        { id: 'media-cerveza', name: 'Media de cerveza', price: 35, priceWithBotana: 55, available: true },
        { id: 'medias-beer', name: 'Medias: Corona, Victoria, Tecate Light, Laguer XX', price: 60, priceWithBotana: 80, available: true },
        { id: 'familiar-beer', name: 'Familiar: Corona, Tecate Light, Sol, Caguamon Laguer XX', price: 60, priceWithBotana: 80, available: true },
        { id: 'jarra-michelada', name: 'Jarra de michelada (caguamon)', price: 100, priceWithBotana: 120, available: true },
        { id: 'jarra-naranjada', name: 'Jarra de naranjada o limonada', price: 100, priceWithBotana: 115, available: true },
        { id: 'michelada-llevar-1lt', name: 'Michelada para llevar de 1 LT', price: 65, priceWithBotana: 80, available: true },
        { id: 'michelada-media', name: 'Michelada media', price: 50, priceWithBotana: 60, available: true },
        { id: 'modelo-lata', name: 'Modelo lata', price: 40, priceWithBotana: 55, available: true },
      ]
    },
    {
      id: 'charolas',
      name: 'Charolas de',
      icon: '🍽️',
      type: 'single-price',
      items: [
        { id: 'botana-chica', name: 'Botana Chica', price: 250, available: true },
        { id: 'botana-mediana', name: 'Botana Mediana', price: 350, available: true },
        { id: 'botana-grande', name: 'Botana Grande', price: 450, available: true },
        { id: 'charola-mariscos', name: 'Mariscos', price: 550, available: true },
      ]
    },
    {
      id: 'platillos',
      name: 'Platillos Tradicionales',
      icon: '🦐',
      type: 'with-half-order',
      items: [
        { id: 'pulpa-camaron', name: 'Pulpa de camarón', price: 180, halfOrderPrice: 95, available: true },
        { id: 'camaron-empanizado', name: 'Camarón empanizado', price: 180, halfOrderPrice: 95, available: true },
        { id: 'camaron-mojo-ajo', name: 'Camarón al mojo de ajo', price: 180, halfOrderPrice: 95, available: true },
        { id: 'filete-pescado', name: 'Filete de pescado', price: 170, halfOrderPrice: 90, available: true },
        { id: 'camaron-agua-chile', name: 'Camarón al agua chile', price: 180, halfOrderPrice: 95, available: true },
        { id: 'ensalada-camaron', name: 'Ensalada de camarón', price: 120, halfOrderPrice: 65, available: true },
        { id: 'jaiba-enchipotlada', name: 'Jaiba enchipotlada', price: 120, halfOrderPrice: 65, available: true },
        { id: 'camaron-tocino', name: 'Camarón al tocino', price: 180, halfOrderPrice: 95, available: true },
        { id: 'ostiones-concha', name: 'Ostiones en su concha', price: 100, halfOrderPrice: 55, available: true },
        { id: 'camarones-diabla', name: 'Camarones a la diabla', price: 180, halfOrderPrice: 95, available: true },
        { id: 'camarones-coco', name: 'Camarones al coco', price: 180, halfOrderPrice: 95, available: true },
        { id: 'filete-plancha', name: 'Filete a la plancha', price: 170, halfOrderPrice: 90, available: true },
        { id: 'carraca', name: 'Carraca', price: 120, halfOrderPrice: 65, available: true },
        { id: 'costilla', name: 'Costilla', price: 150, halfOrderPrice: 80, available: true },
        { id: 'carne-tartara', name: 'Carne tártara', price: 120, halfOrderPrice: 65, available: true },
        { id: 'patita-envinagrada', name: 'Patita envinagrada', price: 120, halfOrderPrice: 65, available: true },
        { id: 'butifarra-padrino', name: 'Butifarra al padrino', price: 120, halfOrderPrice: 65, available: true },
        { id: 'tinga-pollo', name: 'Tinga de pollo', price: 110, halfOrderPrice: 60, available: true },
        { id: 'quesillo', name: 'Quesillo', price: 120, halfOrderPrice: 65, available: true },
        { id: 'queso-cotija', name: 'Queso Cotija', price: 120, halfOrderPrice: 65, available: true },
        { id: 'ensalada-rusa', name: 'Ensalada rusa', price: 120, halfOrderPrice: 65, available: true },
        { id: 'molcajete-mariscos', name: 'Molcajete de mariscos', price: 350, halfOrderPrice: 180, available: true },
        { id: 'mojarra-frita', name: 'Mojarra frita', price: 190, available: true },
      ]
    },
    {
      id: 'alitas',
      name: 'Alitas',
      icon: '🍗',
      type: 'with-half-order',
      items: [
        {
          id: 'alitas-tradicionales',
          name: 'Alitas tradicionales',
          description: 'BBQ, parmesano, lemon pepper y picosas',
          price: 150,
          halfOrderPrice: 95,
          available: true
        },
        {
          id: 'alitas-crunch',
          name: 'Alitas Crunch',
          description: 'BBQ, parmesano, lemon pepper y picosas',
          price: 160,
          halfOrderPrice: 95,
          available: true
        },
        { id: 'papas-francesa', name: 'Papas a la francesa', price: 75, available: true },
      ]
    },
    {
      id: 'cocteles',
      name: 'Cócteles de Camarón',
      icon: '🍤',
      type: 'single-price',
      items: [
        { id: 'coctel-grande', name: 'Cóctel grande', price: 160, available: true },
        { id: 'coctel-mediano', name: 'Cóctel mediano', price: 140, available: true },
      ]
    },
    {
      id: 'cubetazos',
      name: 'Cubetazos',
      icon: '🪣',
      type: 'single-price',
      items: [
        { id: 'cubetazo-caguama-botana', name: 'Cubetazo de Caguama con Botana', price: 180, available: true },
        { id: 'cubetazo-media-botana', name: 'Cubetazo Media con Botana', price: 175, available: true },
        { id: 'cubetazo-media', name: 'Cubetazo de Media', price: 175, available: true },
        { id: 'cubetazo-familiar', name: 'Cubetazo Familiar', price: 180, available: true },
      ]
    },
    {
      id: 'botellas',
      name: 'Botellas',
      icon: '🥃',
      type: 'bottles',
      note: 'Incluyen 1 agua mineral de 2 litros, más botana',
      items: [
        { id: 'etiqueta-roja', name: 'Etiqueta Roja', price: 900, available: true },
        { id: 'torres-10', name: 'Torres 10', price: 800, available: true },
        { id: 'don-julio', name: 'Don Julio', price: 1700, available: true },
        { id: 'black-white', name: 'Black & White', price: 600, available: true },
        { id: 'buchanas-12', name: 'Buchanas 12', price: 1500, available: true },
        { id: 'tequila-tradicional', name: 'Tequila Tradicional', price: 900, available: true },
        { id: 'tequila-100-anos', name: 'Tequila 100 Años', price: 500, available: true },
      ]
    },
    {
      id: 'extras',
      name: 'Extras',
      icon: '➕',
      type: 'extras',
      items: [
        { id: 'frijoles', name: 'Frijoles', price: 60, available: true },
        { id: 'guacamole', name: 'Guacamole', price: 70, available: true },
        { id: 'queso', name: 'Queso', price: 40, available: true },
        { id: 'tostadas', name: 'Tostadas', price: 15, available: true },
        { id: 'esencia-michelada', name: 'Esencia de michelada', price: 40, available: true },
        { id: 'clamato', name: 'Clamato', price: 40, available: true },
        { id: 'cigarro', name: 'Cigarro', price: 10, available: true },
      ]
    },
  ]
};
