-- boite

DROP TABLE IF EXISTS "review";
DROP TABLE IF EXISTS "boite";

CREATE TABLE IF NOT EXISTS "boite" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "description" TEXT,
  "size" REAL, -- REAL correspond à "nombre à virgule"
  "price" REAL NOT NULL,
  "category" TEXT
);

INSERT INTO "boite"("id","name", "description", "size", "price", "category") VALUES
(1,'geneve', 'Peut sentir le gruyère. Peut indique l’heure. La consommation en grande quantité peut provoquer une envie inexpliquée de blanchir de l’argent et d’échapper à l’impôt. Forte odeur d’argent à l’intérieur.Le produit est 100% bio. L’air frais de Genève, en Suisse, soulage le stress, guérit le mal du pays et aide à lutter contre la nostalgie. Il est fait par des mains attentives, toutes les descriptions sur la canœe sont en anglais.',88,86,'Montagne'),

(2,'newyork', 'Le produit est 100% bio. L’air frais de New York soulage le stress, guérit le mal du pays, et aide à lutter contre la nostalgie. Il est fait par des mains prudentes, toutes les descriptions sur la boîte sont en anglais, également disponible dans 800 langues les plus couramment utilisées à New York.
Peut contenir des traces de Bronx, Brooklyn, Queens, ou Staten Island..',388,86,'Polué'),

(3,'paris', 'Attention! Peut contenir des traces de liberté, d’égalité et de fraternité.Le produit est 100% bio. L’air frais de Paris soulage le stress, guérit le mal du pays et aide à combattre la nostalgie. Il est fait par des mains prudentes, toutes les descriptions sur la boîte sont en anglais.',88,86,'Polué'),

(4,'patagonia', 'Cela peut causer des conditions météorologiques extrêmes. Ne devrait pas contenir d’inclusions de CO2. Peut contenir des traces de squelettes fossilisés. La boîte peut ince vers l’avant jusqu’à 2mm par jour.Le produit est 100% bio. L’air frais en conserve de Patagonie soulage le stress, guérit des moments d’ennui, et aide à combattre la mélancolie. Oubliez les aimants, les tasses et les assiettes. Ramenez à la maison quelque chose que tout le monde aimera et posez des questions.
',88,86,'Montagne'),

(5,'shanghai', 'Peut contenir des traces de Xintiandi, Science and Technology Museum et Qibao Ancient Town.
Cela peut être livré par poste de pigeon sur demande.',88,86,'Asiatique'),

(6,'tokyo', 'Contient des traces du mont Fuji. Cette canœur est conçue pour résister à un tremblement de terre de magnitude 9,0 ou plus. N’inspirez qu’avec votre masque.
Bientôt disponible dans tous les distributeurs automatiques à travers le pays. Le produit est 100% bio. L’air frais de Tokyo soulage le stress, guérit le mal du pays et aide à lutter contre la nostalgie. Il est fait par des mains attentives, toutes les descriptions sur la canœe sont en anglais.',88,86,'Asiatique');


-- Review

CREATE TABLE IF NOT EXISTS "review" (
  "id" SERIAL PRIMARY KEY,
  "author" TEXT NOT NULL,
  "note" REAL NOT NULL,
  "title" TEXT,
  "message" TEXT,
  "boite_id" INT,
  FOREIGN KEY("boite_id") REFERENCES "boite"("id")
);

INSERT INTO "review" ("id", "author", "note", "title", "message", "boite_id") VALUES
(1,'Jean Claude Dus',4, 'Une belle boite', 'La finition est bien, Seul bémol, le livreur a abimé la boite.' ,1),
(2,'Thérèse de Monsou',2, 'Bof Bof...', 'La boite ne tient pas debout seule. Certains détails sont mal finis.' ,1),
(3,'Monsieur Preskovitch',5, 'Juste parfaite', 'C''est tellement parfait, on dirait que c''est roulé à la main sous les aisselles.' ,1),

(4,'Barbapapix',5, 'Parfait', 'Un niveau de détail bluffant. A se procurer absolument si vous êtes collectionneurs.' ,2),
(5,'Fabrice',4, 'Très bien', 'Le rapport qualité prix est plus que bien, le prix est vraiment bas pour cette boite de qualité.' ,2),
(6,'Thomas',1, 'Déçu', 'Trop de défaut... A éviter' ,2),

(7,'Lydie',5, 'Parfaite', 'Magnifique boite de qualité du plus bel effet dans ma vitrine. Le rendu des couleurs est vraiment magnifique.' ,3),
(8,'Aurore',3, 'Belle mais...', 'La boite n''est pas stable' ,3),
(9,'Maman Gato',4, 'Contente de mon achat', 'Belles finitions, belle odeur. Mon fils est ravi.' ,3),

(10,'Victor',4, 'Satisfait', 'Bien protégé par du papier bulle et arrivé dans son carton d''origine. boite superbe.' ,4),
(11,'Jean-André',5,'Superbe','Bonne boite je recommande' ,4),

(12,'Céline',5, 'Magnifique', 'Je trouve cette boite magnifique. Le sens du détail est là, j''ai beau cherché des endroits ou la finition aurai été bâclés, je n''en trouve pas.' ,5),
(13,'Florian',2, 'A revoir...', 'Problème de livraison, la boite est arrivée abimée !' ,5),
(14,'Marie-Pierre',5, 'Très belle boite', 'Très contente de mon achat. Bonne qualité et taille convenable.' ,5),

(15,'Magalie',1, 'Un ratâge !', 'Les proportions ne correspondent pas à la photo. Très déçue.' ,6),
(16,'Antoinette',0, 'A éviter !', 'La boite est arrivée cassée ! Malgré les réparations, elle reste moche.' ,6),
(17,'Vincent',2, 'Assez décu', 'Malheureusement, la boite ne resiste pas au seisme.' ,6);
