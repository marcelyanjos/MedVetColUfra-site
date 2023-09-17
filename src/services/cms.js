import axios from 'axios'
import { getToken } from '../CMS/Helpers'
import { API, Host } from '../CMS/constant'

// tabela canil info dashboard
export async function fetchCanilInfo(setRows) {
  try {
    const response = await axios.get(
      `${API}/sections-canil?populate=icon&publicationState=preview`,
    )
    const artigos = response.data.data
    const updatedFormularios = artigos.map((artigo) => ({
      id: artigo.id,
      titulo: artigo.attributes.titulo,
      'data criação': artigo.attributes.createdAt,
      publicado: artigo.attributes.publishedAt !== null,
      icon: artigo.attributes.icon?.data?.attributes?.url
        ? `${Host}${artigo.attributes.icon.data.attributes.url}`
        : null,
    }))

    setRows(updatedFormularios)
    // setIsLoading(false)
  } catch (error) {
    console.error(error)
    // setIsLoading(false)
  }
}

// tabela hovet info dashboard
export async function fetchHovetInfo(setRows) {
  try {
    const response = await axios.get(
      `${API}/sections-hovet?populate=icon&publicationState=preview`,
    )
    const artigos = response.data.data
    const updatedFormularios = artigos.map((artigo) => ({
      id: artigo.id,
      titulo: artigo.attributes.titulo,
      'data criação': artigo.attributes.createdAt,
      publicado: artigo.attributes.publishedAt !== null,
      icon: artigo.attributes.icon?.data?.attributes?.url
        ? `${Host}${artigo.attributes.icon.data.attributes.url}`
        : null,
    }))

    setRows(updatedFormularios)
    // setIsLoading(false)
  } catch (error) {
    console.error(error)
    // setIsLoading(false)
  }
}

// tabela blog dashboard
export async function fetchBlogAdm(setRows) {
  try {
    const response = await axios.get(
      `${API}/artigos?populate=ilustracao,autor&publicationState=preview`,
    )
    const artigos = response.data.data
    const updatedFormularios = artigos.map((artigo) =>
      // console.log('artigo', artigo.attributes.ilustracao.data.attributes.url),
      ({
        id: artigo.id,
        titulo: artigo.attributes.titulo,
        'data criação': artigo.attributes.createdAt,
        publicado: artigo.attributes.publishedAt !== null,
        ilustracao: artigo.attributes.ilustracao?.data?.attributes?.url
          ? `${Host}${artigo.attributes.ilustracao.data.attributes.url}`
          : null,
        autor:
          artigo.attributes.autor.data === null
            ? null
            : artigo.attributes.autor.data.attributes.username,
      }),
    )

    setRows(updatedFormularios)
  } catch (error) {
    console.error(error)
  }
}

// tabela destaques dashboard
export async function fetchDestaque(setRows) {
  try {
    const response = await axios.get(
      `${API}/destaques?populate=imagem&publicationState=preview`,
    )
    const artigos = response.data.data
    const updatedFormularios = artigos.map((artigo) =>
      // console.log('artigo', artigo.attributes.ilustracao.data.attributes.url),
      ({
        id: artigo.id,
        titulo: artigo.attributes.titulo,
        imagem: artigo.attributes.imagem?.data?.attributes?.url
          ? `${Host}${artigo.attributes.imagem.data.attributes.url}`
          : null,
        ordem: artigo.attributes.ordem,
        'data criação': artigo.attributes.createdAt,
        publicado: artigo.attributes.publishedAt !== null,
      }),
    )

    setRows(updatedFormularios)
    // setIsLoading(false)
  } catch (error) {
    console.error(error)
    // setIsLoading(false)
  }
}

// artigo default
export async function fetchArticleId(setArticle, id, getArticleImageUrl) {
  try {
    const response = await axios.get(`${API}/artigos/${id}?populate=ilustracao`)
    const articleData = response.data.data.attributes

    // Obtém a URL correta da ilustração
    const imageUrl =
      articleData.ilustracao && articleData.ilustracao.data
        ? getArticleImageUrl(articleData.ilustracao.data.attributes)
        : null

    setArticle({ ...articleData, ilustracao: imageUrl })
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

// artigos default
export async function fetchArticles(setArticles) {
  try {
    const response = await axios.get(`${API}/artigos?populate=ilustracao`)
    setArticles(response.data.data)
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

// get edit canil info dashboard
export async function getCanilId(
  setFormData,
  id,
  setIsLoading,
  setPublishedAtDate,
) {
  try {
    const response = await axios.get(
      `${API}/sections-canil/${id}?populate=icon`,
    )
    console.log('Resultado do GET:', response.data)

    const articleData = response.data?.data?.attributes || {}

    setFormData((prevData) => ({
      ...prevData,
      titulo: articleData.titulo || '',
      subtitulo: articleData.subtitulo || '',
      icon: articleData.icon || null,
      iconPreview:
        articleData.icon &&
        articleData.icon.data &&
        articleData.icon.data.attributes &&
        articleData.icon.data.attributes.url
          ? `${Host}${articleData.icon.data.attributes.url}`
          : null,
      descricao: articleData.descricao || '',
      autor: articleData.autor || '',
      body: articleData.body || '',
      publishedAt: articleData.publishedAt || '',
    }))
    setIsLoading(false)
    setPublishedAtDate(
      articleData.publishedAt ? new Date(articleData.publishedAt) : null,
    )
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

// get edit hovet info dashboard
export async function getHovetId(
  setFormData,
  id,
  setIsLoading,
  setPublishedAtDate,
) {
  try {
    const response = await axios.get(
      `${API}/sections-hovet/${id}?populate=icon`,
    )
    console.log('Resultado do GET:', response.data)

    const articleData = response.data?.data?.attributes || {}

    setFormData((prevData) => ({
      ...prevData,
      titulo: articleData.titulo || '',
      subtitulo: articleData.subtitulo || '',
      icon: articleData.icon || null,
      iconPreview:
        articleData.icon &&
        articleData.icon.data &&
        articleData.icon.data.attributes &&
        articleData.icon.data.attributes.url
          ? `${Host}${articleData.icon.data.attributes.url}`
          : null,
      descricao: articleData.descricao || '',
      autor: articleData.autor || '',
      body: articleData.body || '',
      publishedAt: articleData.publishedAt || '',
    }))
    setIsLoading(false)
    setPublishedAtDate(
      articleData.publishedAt ? new Date(articleData.publishedAt) : null,
    )
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

// get edit artigo dashboard
export async function getArticleId(
  setFormData,
  id,
  setIsLoading,
  setPublishedAtDate,
) {
  try {
    const response = await axios.get(`${API}/artigos/${id}?populate=ilustracao`)
    console.log('Resultado do GET:', response.data)

    const articleData = response.data?.data?.attributes || {}

    setFormData((prevData) => ({
      ...prevData,
      titulo: articleData.titulo || '',
      ilustracao: articleData.ilustracao || null,
      ilustracaoPreview:
        articleData.ilustracao &&
        articleData.ilustracao.data &&
        articleData.ilustracao.data.attributes &&
        articleData.ilustracao.data.attributes.url
          ? `${Host}${articleData.ilustracao.data.attributes.url}`
          : null,
      descricao: articleData.descricao || '',
      autor: articleData.autor || '',
      body: articleData.body || '',
      publishedAt: articleData.publishedAt || '',
    }))
    setIsLoading(false)
    setPublishedAtDate(
      articleData.publishedAt ? new Date(articleData.publishedAt) : null,
    )
    console.log('data', articleData.ilustracao.data.attributes.url)
  } catch (error) {
    console.error('Error fetching article:', error)
  }
}

// get editor destaque dashboard
export async function getDestaqueId(
  setFormData,
  id,
  setIsLoading,
  setPublishedAtDate,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
) {
  try {
    const response = await axios.get(
      `${API}/destaques/${id}?populate=imagem,conteudo`,
    )

    const articleData = response.data?.data?.attributes || {}

    setFormData((prevData) => ({
      ...prevData,
      titulo: articleData.titulo || '',
      imagem: articleData.imagem || null,
      imagemPreview:
        articleData.imagem &&
        articleData.imagem.data &&
        articleData.imagem.data.attributes &&
        articleData.imagem.data.attributes.url
          ? `${Host}${articleData.imagem.data.attributes.url}`
          : null,
      link: articleData.link || '',
      conteudo: articleData.conteudo || null,
      conteudoPreview:
        articleData.conteudo &&
        articleData.conteudo.data &&
        articleData.conteudo.data.attributes &&
        articleData.conteudo.data.attributes.url
          ? `${Host}${articleData.conteudo.data.attributes.url}`
          : null,
      ordem: articleData.ordem || '',
      publishedAt: articleData.publishedAt || '',
    }))
    setPublishedAtDate(
      articleData.publishedAt ? new Date(articleData.publishedAt) : null,
    )
    setIsLoading(false)
  } catch (error) {
    console.error('Error fetching article:', error)
    setOpenSnackbar(true)
    setSnackbarMessage('Erro ao listar destaque.')
    setSnackbarSeverity('error')
  }
}

// novo/editar canil info dashboard
export async function populateCanil(
  navigate,
  formData,
  setFormData,
  publishedAt,
  id,
) {
  try {
    const form = new FormData()
    form.append('files.icon', formData.icon)
    form.append(
      'data',
      JSON.stringify({
        titulo: formData.titulo,
        subtitulo: formData.subtitulo,
        descricao: formData.descricao,
        autor: formData.autor,
        body: formData.body,
        publishedAt,
      }),
    )

    const authToken = getToken()
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }

    const config = {
      headers,
    }

    if (id) {
      await axios.put(`${API}/sections-canil/${id}?populate=icon`, form, config)
      console.log('Seção editada com sucesso!')
    } else {
      await axios.post(`${API}/sections-canil`, form, config)
      console.log('Seção adicionado com sucesso!')
    }

    setFormData({
      titulo: '',
      subtitulo: '',
      descricao: '',
      icon: null,
      iconPreview: null,
      body: '',
      publishedAt: '',
    })

    navigate('/admin/dashboard/canilInfo')
  } catch (error) {
    console.error('Erro ao enviar o seção:', error)
  }
}

// novo/editar hovet info dashboard
export async function populateHovet(
  navigate,
  formData,
  setFormData,
  publishedAt,
  id,
) {
  try {
    const form = new FormData()
    form.append('files.icon', formData.icon)
    form.append(
      'data',
      JSON.stringify({
        titulo: formData.titulo,
        subtitulo: formData.subtitulo,
        descricao: formData.descricao,
        autor: formData.autor,
        body: formData.body,
        publishedAt,
      }),
    )

    const authToken = getToken()
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }

    const config = {
      headers,
    }

    if (id) {
      await axios.put(`${API}/sections-hovet/${id}?populate=icon`, form, config)
      console.log('Seção editada com sucesso!')
    } else {
      await axios.post(`${API}/sections-hovet`, form, config)
      console.log('Seção adicionado com sucesso!')
    }

    setFormData({
      titulo: '',
      subtitulo: '',
      descricao: '',
      icon: null,
      iconPreview: null,
      body: '',
      publishedAt: '',
    })

    navigate('/admin/dashboard/HovetInfo')
  } catch (error) {
    console.error('Erro ao enviar o seção:', error)
  }
}

// novo/editar artigo dashboard
export async function popopulateArticle(
  navigate,
  formData,
  setFormData,
  publishedAtDate,
  id,
  user,
) {
  try {
    const form = new FormData()
    form.append('files.ilustracao', formData.ilustracao)
    form.append(
      'data',
      JSON.stringify({
        titulo: formData.titulo,
        descricao: formData.descricao,
        autor: user?.id,
        body: formData.body,
        publishedAt: publishedAtDate,
      }),
    )

    const authToken = getToken()
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }

    const config = {
      headers,
    }

    if (id) {
      await axios.put(`${API}/artigos/${id}?populate=ilustracao`, form, config)
      console.log('Artigo editado com sucesso!')
    } else {
      await axios.post(`${API}/artigos`, form, config)
      console.log('Artigo adicionado com sucesso!')
    }

    setFormData({
      titulo: '',
      ilustracao: null,
      ilustracaoPreview: null,
      descricao: '',
      autor: user?.username || '',
      body: '',
      publishedAt: '',
    })

    navigate('/admin/dashboard/artigos')
  } catch (error) {
    console.error('Erro ao enviar o artigo:', error)
  }
}

// novo/editar destaque dashboard
export async function populateDestaque(
  formData,
  setFormData,
  publishedAtDate,
  id,
  navigate,
  setOpenSnackbar,
  setSnackbarMessage,
  setSnackbarSeverity,
) {
  try {
    const form = new FormData()
    form.append('files.imagem', formData.imagem)
    if (formData.conteudo) {
      form.append('files.conteudo', formData.conteudo)
    }
    form.append(
      'data',
      JSON.stringify({
        titulo: formData.titulo,
        link: formData.link,
        publishedAt: publishedAtDate,
      }),
    )

    const authToken = getToken()
    const headers = {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'multipart/form-data',
    }

    const config = {
      headers,
    }

    if (id) {
      await axios.put(
        `${API}/destaques/${id}?populate=imagem,conteudo`,
        form,
        config,
      )
      setOpenSnackbar(true)
      setSnackbarMessage('Arquivo editado com sucesso.')
      setSnackbarSeverity('success')
    } else {
      await axios.post(`${API}/destaques`, form, config)
      setOpenSnackbar(true)
      setSnackbarMessage('Arquivo adicionado com sucesso.')
      setSnackbarSeverity('success')
    }

    setFormData({
      titulo: '',
      link: '',
      imagem: null,
      imagemPreview: null,
      conteudo: null,
      conteudoPreview: null,
      publishedAt: '',
    })

    navigate('/admin/dashboard/destaque')
  } catch (error) {
    console.error('Erro ao enviar a seção:', error)
  }
}
