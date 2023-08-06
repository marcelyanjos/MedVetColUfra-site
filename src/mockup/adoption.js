const initialRows = [
  {
    id: 1,
    nome: "Damien",
    image:
      "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
    images: [
      "https://www.petz.com.br/blog/wp-content/uploads/2021/11/enxoval-para-gato-Copia.jpg",
      "https://s36537.pcdn.co/wp-content/uploads/2017/09/A-tabby-cat-with-an-ID-collar-on.jpg.optimal.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvB5GEATGUYtnmenfZ8z2lbYaU_YWiG0g-XuWBFjN20GgN55ED-Rke5XYEJ9Uvc4EpF4&usqp=CAU",
    ],
    idade: 1.6,
    especie: "gato",
    sexo: "macho",
    especial: false,
    adotado: false,
  },
  {
    id: 2,
    nome: "Clara",
    image:
      "https://static.poder360.com.br/2020/04/GATO-CORONAVIRUS-768x737.jpg",
    images: [
      "https://static.poder360.com.br/2020/04/GATO-CORONAVIRUS-768x737.jpg",
      "https://s36537.pcdn.co/wp-content/uploads/2017/09/A-tabby-cat-with-an-ID-collar-on.jpg.optimal.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBvB5GEATGUYtnmenfZ8z2lbYaU_YWiG0g-XuWBFjN20GgN55ED-Rke5XYEJ9Uvc4EpF4&usqp=CAU",
    ],
    idade: 2.6,
    especie: "gato",
    sexo: "femea",
    especial: true,
    adotado: false,
  },
  {
    id: 3,
    nome: "Mel",
    image:
      "https://conteudo.imguol.com.br/c/entretenimento/eb/2022/03/23/cachorro-da-raca-lulu-da-pomeramia-1648065976007_v2_900x506.jpg.webp",
    images: [
      "https://conteudo.imguol.com.br/c/entretenimento/eb/2022/03/23/cachorro-da-raca-lulu-da-pomeramia-1648065976007_v2_900x506.jpg.webp",
      "https://www.mundoecologia.com.br/wp-content/uploads/2019/05/Spitz-Alem%C3%A3o-An%C3%A3o-Zwergspitz-2.jpg",
      "https://www.mundoecologia.com.br/wp-content/uploads/2019/05/Spitz-Alem%C3%A3o-An%C3%A3o-Zwergspitz-2.jpg",
    ],
    idade: 1.9,
    especie: "cachorro",
    sexo: "femea",
    especial: false,
    adotado: true,
  },
  {
    id: 4,
    nome: "Luna",
    image:
      "https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2020/08/cachorro.jpg",
    images: [
      "https://www.istoedinheiro.com.br/wp-content/uploads/sites/17/2020/08/cachorro.jpg",
      "https://static1.patasdacasa.com.br/articles/5/16/5/@/376-saiba-tudo-sobre-uma-das-racas-de-cachor-articles_media_mobile-1.jpg",
      "https://i0.wp.com/petanjo.com/blog/wp-content/uploads/2021/03/labrador-retriever-3.png?fit=1920%2C1281&ssl=1",
    ],
    idade: 0.6,
    especie: "cachorro",
    sexo: "femea",
    especial: true,
    adotado: false,
  },
  {
    id: 5,
    nome: "Zacarias",
    image:
      "https://www.significadodossonhosonline.com/wp-content/uploads/2019/07/sonhar-matando-gato.jpg",
    images: [
      "https://www.significadodossonhosonline.com/wp-content/uploads/2019/07/sonhar-matando-gato.jpg",
      "https://img.freepik.com/fotos-premium/um-gato-cinza-e-branco-em-um-tapete-conceito-de-bem-estar_543278-228.jpg",
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    idade: 2.3,
    especie: "gato",
    sexo: "macho",
    especial: false,
    adotado: false,
  },
  {
    id: 6,
    nome: "Branca",
    image:
      "https://s2.glbimg.com/iSHDkXpLfK9AeHTGD8op1em2pYI=/e.glbimg.com/og/ed/f/original/2022/02/14/vidadebicho-gato-sol-pexels-photo-1469228.jpeg",
    images: [
      "https://s2.glbimg.com/iSHDkXpLfK9AeHTGD8op1em2pYI=/e.glbimg.com/og/ed/f/original/2022/02/14/vidadebicho-gato-sol-pexels-photo-1469228.jpeg",
      "https://www.thesprucepets.com/thmb/4Ccj_2np2nBy5UvZcm0IlHVLk4o=/2121x0/filters:no_upscale():strip_icc()/GettyImages-1067857094-dd4cc0c7b2ef48b1a7afe44e85b1082b.jpg",
      "https://excitedcats.com/wp-content/uploads/2021/01/khao-manee-cat-portrait_ne_photo_Shutterstock.jpg",
    ],
    idade: 2.2,
    especie: "gato",
    sexo: "femea",
    especial: false,
    adotado: true,
  },
  {
    id: 7,
    nome: "Leonidas",
    image:
      "https://cobasi.vteximg.com.br/arquivos/ids/264237/Beagle.jpg?v=637019918974170000",
    images: [
      "https://cobasi.vteximg.com.br/arquivos/ids/264237/Beagle.jpg?v=637019918974170000",
      "https://doglife.doglife.com.br/api/1/blog/doglife/blogFacade/assets/6287da7b2230f93aacb4e1c6/beagle-capa.jpg?w=720",
      "https://blog.polipet.com.br/wp-content/uploads/2023/01/AdobeStock_168506725.jpeg",
    ],
    idade: 1.3,
    especie: "cachorro",
    sexo: "macho",
    especial: true,
    adotado: false,
  },
];

export default initialRows;
