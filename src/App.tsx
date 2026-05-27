import { useState, type FormEvent } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import './App.css'

export type Recipe = {
  titre: string
  description: string
  image: string
  temps: {
    preparation: string
    cuisson: string
    total: string
  }
  ingredients: string[]
  etapes: string[]
  conseils: string[]
}

export type Page = 'home' | 'ajouter' | 'apropos'
export type Role = 'admin' | 'user' | 'abonnee'

const initialRecipes: Recipe[] = [
  {
    titre: 'Lasagnes à la bolognaise',
    description: 'Savourez la délicieuse recette des lasagnes, l’une des spécialités italiennes que tout le monde aime avec sa viande hachée et gratinée à l’emmental.',
    image: 'https://images.unsplash.com/photo-1601924638867-3ecb234ccf58?auto=format&fit=crop&w=800&q=80',
    temps: { preparation: '30 min', cuisson: '45 min', total: '1h15' },
    ingredients: ['Pâtes à lasagnes', '500g de bœuf haché', 'Sauce tomate', 'Béchamel', 'Emmental râpé'],
    etapes: ['Préparer la sauce bolognaise.', 'Superposer les couches de pâtes, de viande et de béchamel.', 'Saupoudrer de fromage et enfourner à 200°C.'],
    conseils: ['Laissez reposer 10 minutes avant de couper les parts.']
  },
  {
    titre: 'Pizza authentique',
    description: 'Une pâte fine et croustillante, une sauce tomate maison savoureuse et de la mozzarella fondante pour retrouver le goût de l’Italie.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
    temps: { preparation: '20 min', cuisson: '15 min', total: '35 min' },
    ingredients: ['Pâte à pizza', 'Sauce tomate', 'Mozzarella di Bufala', 'Basilic frais', 'Huile d’olive'],
    etapes: ['Étaler la pâte.', 'Ajouter la sauce tomate and la mozzarella.', 'Cuire à température maximale (250°C+).'],
    conseils: ['Ajoutez le basilic frais à la sortie du four pour garder tout son arôme.']
  },
  {
    titre: 'Poisson grillé aux petits légumes',
    description: 'Une recette saine, légère et parfumée. Un poisson entier grillé à la perfection accompagné de légumes de saison rôtis.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    temps: { preparation: '15 min', cuisson: '20 min', total: '35 min' },
    ingredients: ['1 poisson entier (Daurade ou Truite)', 'Citron', 'Romarin & Thym', 'Courgettes', 'Carottes'],
    etapes: ['Vider et nettoyer le poisson.', 'Garnir l’intérieur d’herbes et de rondelles de citron.', 'Griller au four ou au barbecue.'],
    conseils: ['Arrosez d’un filet d’huile d’olive de qualité juste avant de servir.']
  }
]

const parseList = (text: string) => text.split('\n').map(line => line.trim()).filter(Boolean)

export default function App() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number | null>(null)
  const [page, setPage] = useState<Page>('home')
  const [role, setRole] = useState<Role>('user')
  const [imageEdit, setImageEdit] = useState('')
  const [form, setForm] = useState({
    titre: '',
    description: '',
    image: '',
    preparation: '15 min',
    cuisson: '20 min',
    total: '35 min',
    ingredients: '',
    etapes: '',
  })

  const handleInputChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSelectRecipe = (recipe: Recipe, index: number) => {
    setSelectedRecipe(recipe)
    setSelectedRecipeIndex(index)
    setImageEdit(recipe.image)
  }

  const handleDeleteRecipe = (index: number) => {
    setRecipes((prev) => prev.filter((_, i) => i !== index))
    if (selectedRecipeIndex === index) {
      setSelectedRecipe(null)
      setSelectedRecipeIndex(null)
      setImageEdit('')
    }
  }

  const handleUpdateRecipeImage = () => {
    if (selectedRecipeIndex === null) return
    setRecipes((prev) => prev.map((recipe, i) => (
      i === selectedRecipeIndex ? { ...recipe, image: imageEdit } : recipe
    )))
    setSelectedRecipe((prev) => prev ? { ...prev, image: imageEdit } : null)
  }

  const handleAddRecipe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newRecipe: Recipe = {
      titre: form.titre.trim() || 'Nouvelle recette',
      description: form.description.trim() || 'Description à compléter',
      image: form.image.trim() || 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
      temps: { preparation: form.preparation, cuisson: form.cuisson, total: form.total },
      ingredients: parseList(form.ingredients),
      etapes: parseList(form.etapes),
      conseils: []
    }

    setRecipes((prev) => [newRecipe, ...prev])
    setPage('home')
    setForm({
      titre: '',
      description: '',
      image: '',
      preparation: '15 min',
      cuisson: '20 min',
      total: '35 min',
      ingredients: '',
      etapes: '',
    })
  }

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} setSelectedRecipe={setSelectedRecipe} role={role} setRole={setRole} />

      {/* Hero Banner (Accueil global uniquement) */}
      {!selectedRecipe && page === 'home' && (
          <header className="hero">
            <div className="hero-left">
              <div className="hero-intro">
                <span className="categorie">Recettes dynamiques</span>
                <h1>Ma cuisine en un clic</h1>
                <p>Choisis une recette, découvre les étapes et ajoute ta propre préparation.</p>
              </div>

              <div className="hero-widgets">
                <article className="widget">
                  <span>Simple et rapide</span>
                  <strong>Découvre ta prochaine recette en quelques secondes.</strong>
                </article>
                <article className="widget">
                  <span>Fluidité garantie</span>
                  <strong>Navigation et animations douces pour rester inspiré.</strong>
                </article>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-plate">
                <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80" alt="Assiette" />
              </div>
            </div>
          </header>
      )}

      {/* Pages dynamiques */}
      <div className="page">
        {page === 'home' && !selectedRecipe && (
          <section>
            <h2 className="section-title">Recettes du moment</h2>
            <div className="recipes-grid">
              {recipes.map((recipe, index) => (
                <article key={index} className="recipe-card" onClick={() => handleSelectRecipe(recipe, index)}>
                  {role === 'admin' && (
                    <button
                      type="button"
                      className="recipe-delete"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleDeleteRecipe(index)
                      }}
                    >
                      Supprimer
                    </button>
                  )}
                  <div className="recipe-image-wrapper">
                    <img src={recipe.image} alt={recipe.titre} />
                  </div>
                  <div className="recipe-content">
                    <h3>{recipe.titre}</h3>
                    <p>{recipe.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Vue détaillée de la recette */}
        {selectedRecipe && page === 'home' && (
          <article className="recipe-detail">
            <button onClick={() => setSelectedRecipe(null)} className="btn-primary" style={{ marginBottom: '20px' }}>
              ← Retour aux recettes
            </button>
            {role === 'admin' && selectedRecipeIndex !== null && (
              <button
                type="button"
                className="btn-secondary delete-detail"
                onClick={() => handleDeleteRecipe(selectedRecipeIndex)}
              >
                Supprimer cette recette
              </button>
            )}
            <h1>{selectedRecipe.titre}</h1>
            <p>{selectedRecipe.description}</p>
            {role !== 'user' && selectedRecipeIndex !== null && (
              <div className="image-edit-section">
                <label htmlFor="imageEdit">Modifier l’URL de l’image</label>
                <div className="image-edit-row">
                  <input
                    id="imageEdit"
                    className="form-control"
                    value={imageEdit}
                    onChange={(e) => setImageEdit(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <button type="button" className="btn-primary btn-small" onClick={handleUpdateRecipeImage}>
                    Mettre à jour
                  </button>
                </div>
              </div>
            )}
            <div className="meta-info">
              <div><strong>Préparation :</strong> {selectedRecipe.temps.preparation}</div>
              <div><strong>Cuisson :</strong> {selectedRecipe.temps.cuisson}</div>
              <div><strong>Total :</strong> {selectedRecipe.temps.total}</div>
            </div>

            <div className="detail-grid">
              <section>
                <h2>Ingrédients</h2>
                <ul>
                  {selectedRecipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                </ul>
              </section>
              <section>
                <h2>Étapes de préparation</h2>
                <ol>
                  {selectedRecipe.etapes.map((etape, i) => <li key={i}>{etape}</li>)}
                </ol>
              </section>
            </div>
          </article>
        )}

        {/* Formulaire de création */}
        {page === 'ajouter' && (
          <section className="form-section">
            <h2 className="section-title">Partagez votre recette</h2>
            <form onSubmit={handleAddRecipe}>
              <div className="form-group">
                <label>Titre de la recette</label>
                <input className="form-control" value={form.titre} onChange={e => handleInputChange('titre', e.target.value)} placeholder="Ex: Gratin Dauphinois" />
              </div>
              <div className="form-group">
                <label>URL de l'image</label>
                <input className="form-control" value={form.image} onChange={e => handleInputChange('image', e.target.value)} placeholder="https://images.unsplash.com/..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" value={form.description} onChange={e => handleInputChange('description', e.target.value)} rows={3} placeholder="Courte introduction culinaire..." />
              </div>
              <div className="form-group">
                <label>Ingrédients (un par ligne)</label>
                <textarea className="form-control" value={form.ingredients} onChange={e => handleInputChange('ingredients', e.target.value)} rows={5} placeholder="Ex: 500g de farine" />
              </div>
              <div className="form-group">
                <label>Étapes (une par ligne)</label>
                <textarea className="form-control" value={form.etapes} onChange={e => handleInputChange('etapes', e.target.value)} rows={5} placeholder="Ex: Préchauffer le four." />
              </div>
              <button type="submit" className="btn-primary">Publier la recette</button>
            </form>
          </section>
        )}

        {/* À propos */}
        {page === 'apropos' && (
          <section className="form-section">
            <h2 className="section-title">À propos de Babs Kitchen</h2>
            <p style={{ lineHeight: '1.7', color: 'var(--text-muted)' }}>
              Bienvenue sur Babs Kitchen ! Ce blog culinaire a pour vocation de partager le plaisir d'une cuisine simple, authentique et accessible. Conçu pour inspirer les cuisiniers du quotidien, il permet de découvrir des recettes classiques ou originales et d'ajouter facilement vos propres créations.
            </p>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}