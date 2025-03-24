const codenames = [
    "The Nightingale", "The Kraken", "Shadow Viper", "Phantom Hawk", "Ghost Falcon",
    "Steel Cobra", "Silent Specter", "Black Phoenix", "Echo Mirage", "Nova Striker",
    "Frostbite", "Thunderbolt", "Omega Whisper", "Titan Fang", "Cyber Lynx",
    "Mirage Fox", "Storm Reaper", "Red Serpent", "Void Phantom", "Alpha Griffin",
    "Iron Raptor", "Sonic Wraith", "Tempest Shadow", "Silver Wolf", "Raven Fang",
    "Obsidian Specter", "Phantom Banshee", "Crimson Ghost", "Midnight Specter", "Apex Hunter",
    "Blue Chimera", "Quantum Phantom", "Eclipse Viper", "Ghost Lynx", "Storm Falcon",
    "Shadow Talon", "Inferno Wraith", "Venom Strike", "Silent Tempest", "Dark Sentinel",
    "Blaze Phantom", "Arctic Viper", "Neon Falcon", "Cyber Phantom", "Nightshade",
    "Rogue Specter", "Solar Eclipse", "Storm Hydra", "Iron Specter", "Tundra Shadow",
    "Echo Phantom", "Dagger Fang", "Void Reaper", "Thunder Serpent", "Ghost Reaver",
    "Solar Phantom", "Titan Phantom", "Midnight Reaver", "Glacier Wolf", "Spectral Chimera",
    "Cyber Scorpion", "Omega Falcon", "Shadow Banshee", "Void Lynx", "Tempest Ghost",
    "Lightning Fang", "Crimson Talon", "Oblivion Reaper", "Nova Phantom", "Tornado Hawk",
    "Storm Wolf", "Silent Raptor", "Blizzard Phantom", "Abyss Ghost", "Black Widow",
    "Electric Shadow", "Solar Wraith", "Storm Banshee", "Frost Phantom", "Aether Lynx",
    "Cyber Phantom", "Iron Ghost", "Crimson Specter", "Midnight Wraith", "Obsidian Viper",
    "Night Phantom", "Storm Vortex", "Spectral Reaver", "Tundra Phantom", "Vortex Talon",
    "Neon Raptor", "Eclipse Phantom", "Silent Venom", "Glacier Reaper", "Thunder Phantom",
    "Tornado Specter", "Ghost Banshee", "Omega Reaper", "Blaze Specter", "Titan Shadow"
];

const getRandomCodename = () => {
    return codenames[Math.floor(Math.random() * codenames.length)];
}

module.exports = { codenames, getRandomCodename };