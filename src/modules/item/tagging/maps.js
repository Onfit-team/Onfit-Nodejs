// motif dictionary (fruit, animal, character, object)
export const motifDictionary = {
  fruit: {
    strawberry: "A single whole strawberry motif with green leaves on top",
    grape: "A grape bunch motif with many small grapes on one stem",
    cherry: "Two red cherries motif connected with one green stem",
    lemon: "A single oval yellow lemon motif",
    orange: "A round orange fruit motif",
    banana: "A single curved yellow banana motif",
    apple: "A single red apple motif with a leaf on top",
    watermelon: "A large green watermelon motif with striped skin",
    pineapple: "A yellow pineapple motif with spiky green leaves",
  },
  animal: {
    cat: "A domestic cat motif with pointy ears and whiskers",
    dog: "A cute dog motif with floppy ears",
    tiger: "A tiger motif with black stripes",
    lion: "A lion motif with a large mane",
    penguin: "A penguin motif standing upright",
    bear: "A bear motif with round ears and big body",
    rabbit: "A rabbit motif with long ears",
    deer: "A deer motif with antlers",
    elephant: "An elephant motif with a trunk",
  },
  character: {
    mickey_mouse: "A Mickey Mouse motif with big round ears",
    spongebob: "A SpongeBob motif with square body and face",
    pikachu: "A Pikachu motif with yellow body, pointy ears, red cheeks",
    hello_kitty: "A Hello Kitty motif with white cat face and a bow",
    winnie_the_pooh: "A Winnie the Pooh motif, yellow bear with red shirt",
    mario: "A Mario motif, cartoon man with red hat and mustache",
  },
  object: {
    star: "A simple 5-pointed star motif",
    heart: "A red heart motif",
    diamond_shape: "A geometric diamond shape motif",
    cross: "A Christian cross motif",
    moon: "A crescent moon motif",
    sun: "A bright sun motif with rays",
    snowflake: "A snowflake motif with six branches",
    cloud: "A fluffy white cloud motif",
  },
};

// category mapping
export const categoryMap = {
  1: "top",
  2: "bottom",
  3: "one-piece",
  4: "outerwear",
  5: "shoes",
  6: "accessory",
};

// subcategory mapping (category:subcategory)
export const subcategoryMap = {
  "1:1": "short-sleeve t-shirt",
  "1:2": "long-sleeve t-shirt",
  "1:3": "sleeveless",
  "1:4": "shirt or blouse",
  "1:5": "sweatshirt",
  "1:6": "hoodie",
  "1:7": "knitwear",
  "1:8": "other top",

  "2:1": "shorts",
  "2:2": "long pants",
  "2:3": "jeans",
  "2:4": "training pants",
  "2:5": "leggings",
  "2:6": "skirt",
  "2:7": "other bottom",

  "3:1": "mini dress",
  "3:2": "long dress",
  "3:3": "strap dress",
  "3:4": "knit dress",
  "3:5": "other dress",

  "4:1": "windbreaker",
  "4:2": "cardigan",
  "4:3": "jacket",
  "4:4": "coat",
  "4:5": "padding",
  "4:6": "zip-up hoodie",
  "4:7": "mustang or fur jacket",
  "4:8": "other outerwear",

  "5:1": "sneakers",
  "5:2": "boots",
  "5:3": "sandals",
  "5:4": "slippers",
  "5:5": "dress shoes",
  "5:6": "loafers",
  "5:7": "other shoes",

  "6:1": "hat",
  "6:2": "scarf",
  "6:3": "gloves",
  "6:4": "socks",
  "6:5": "glasses or sunglasses",
  "6:6": "bag",
  "6:7": "watch or jewelry",
  "6:8": "other accessory",
};

// ✅ 원래 openai.js와 일치하는 color mapping
export const colorMap = {
  1: "white",
  2: "black", 
  3: "gray",
  4: "beige/brown",     // 원래 openai.js 매핑
  5: "navy/blue",       // 원래 openai.js 매핑 (여기가 문제였음!)
  6: "red/pink",        // 원래 openai.js 매핑
  7: "orange/yellow",   // 원래 openai.js 매핑
  8: "green",
  9: "purple", 
  10: "multi/pattern",
};

// season mapping
export const seasonMap = {
  1: "spring",
  2: "summer",
  3: "fall",
  4: "winter",
};