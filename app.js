/**
 * Guild Manager Application Logic - Pure Vanilla JS
 * Offline-first, auto-saving, Daybreak Census API Integrated
 */

// Initial Seed Data from Google Sheet
const SEED_ROSTER = [
  { PlayerID: "Ajurk", DKP: 0, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Alpha", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Anonymous", DKP: 0, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Artisan", DKP: 4, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Awesomo", DKP: 25, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Bardly", DKP: 11, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Baxter", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Belwyn", DKP: 36, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Blurz", DKP: 14, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Bodhi", DKP: 36, Sorts: "Wed/Thu, Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Broker", DKP: 0, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Carolus", DKP: 17, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Cloudsongz", DKP: 0, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Crewl", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Crowd", DKP: 20, Sorts: "Backup", Attendance: 0.0 },
  { PlayerID: "Cweetness", DKP: 36, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Dalinoir", DKP: 7, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Deadweight", DKP: 0, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Deathnote", DKP: 5, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Devenie", DKP: 4, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Drane", DKP: 16, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Dudey", DKP: 4, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Escrow", DKP: 0, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Eskers", DKP: 4, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Evyx", DKP: 33, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Facet", DKP: 4, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Firefall", DKP: 4, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Fizzlin", DKP: 17, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Gauzepad", DKP: 4, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Genesi", DKP: 4, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Geohood", DKP: 23, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Graile", DKP: 10, Sorts: "Backup", Attendance: 0.0 },
  { PlayerID: "Guild Bank", DKP: 0, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Hakuna", DKP: 17, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Healinghands", DKP: 0, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Hyac", DKP: 36, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Jade", DKP: 27, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Jaxx", DKP: 36, Sorts: "Wed/Thu, Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Jdark", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Kissesandthugs", DKP: 4, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Lionyl", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Malin", DKP: 0, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Melessa", DKP: 19, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Miro", DKP: 9, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Morb", DKP: 26, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Paper", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Phteve", DKP: 0, Sorts: "Backup", Attendance: 0.0 },
  { PlayerID: "Prowlesis", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Slurgedirge", DKP: 22, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Soulreaper", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Subpar", DKP: 32, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Sylestia", DKP: 33, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "System", DKP: 0, Sorts: "", Attendance: 0.0 },
  { PlayerID: "Testament", DKP: 0, Sorts: "Backup", Attendance: 0.0 },
  { PlayerID: "Track", DKP: 26, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Trashpanda", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Treachery", DKP: 27, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Tyrael", DKP: 0, Sorts: "Backup", Attendance: 0.0 },
  { PlayerID: "Uvaid", DKP: 36, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Voormedicus", DKP: 36, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Vril", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Vyce", DKP: 25, Sorts: "Mon/Tues", Attendance: 0.0 },
  { PlayerID: "Waffle", DKP: 30, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Xylith", DKP: 36, Sorts: "Mon/Tues, Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Zarc", DKP: 0, Sorts: "Wed/Thu", Attendance: 0.0 },
  { PlayerID: "Zhaixe", DKP: 0, Sorts: "Backup", Attendance: 0.0 }
];

// Class to Role mapping for EverQuest II
const CLASS_ROLE_MAP = {
  // Fighters (Tanks)
  "Guardian": "tank", "Berserker": "tank", "Paladin": "tank", "Shadowknight": "tank", "Monk": "tank", "Bruiser": "tank",
  // Priests (Healers)
  "Templar": "healer", "Inquisitor": "healer", "Warden": "healer", "Fury": "healer", "Defiler": "healer", "Mystic": "healer", "Channeler": "healer",
  // Mages (Casters)
  "Wizard": "mage", "Warlock": "mage", "Conjuror": "mage", "Necromancer": "mage", "Coercer": "mage", "Illusionist": "mage",
  // Scouts (DPS/Bards/Utility)
  "Assassin": "scout", "Ranger": "scout", "Dirge": "scout", "Troubador": "scout", "Swashbuckler": "scout", "Brigand": "scout", "Beastlord": "scout"
};

// Global App State
let state = {
  players: [],
  attendanceLog: [],
  lootLog: [],
  serviceId: "sukiecrisp",
  serverName: "Wuoshi",
  settings: {},
  activeView: "dashboard",
  editingPlayerId: null
};

// Load Initial State
function initApp() {
  const localData = localStorage.getItem("guild_manager_data");
  const attendanceData = localStorage.getItem("guild_manager_attendance_log");
  const lootData = localStorage.getItem("guild_manager_loot_log");
  const serviceIdData = localStorage.getItem("guild_manager_service_id");
  const serverNameData = localStorage.getItem("guild_manager_server_name");
  if (localData) {
    try {
      state.players = JSON.parse(localData);
      state.attendanceLog = attendanceData ? JSON.parse(attendanceData) : [];
      state.lootLog = lootData ? JSON.parse(lootData) : [];
      if (serviceIdData) state.serviceId = serviceIdData;
      if (serverNameData) state.serverName = serverNameData;
      migrateStoredData();
      showToast("Loaded guild data from browser storage", "success");
    } catch (e) {
      console.error("Failed to parse local storage", e);
      loadSeedRoster();
    }
  } else {
    loadSeedRoster();
  }
  
  const serviceInput = document.getElementById("settings-service-id");
  if (serviceInput) serviceInput.value = state.serviceId || "sukiecrisp";
  const serverInput = document.getElementById("settings-server-name");
  if (serverInput) serverInput.value = state.serverName || "Wuoshi";

  // Register Navigation Handlers
  document.querySelectorAll(".nav-item button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const viewId = btn.closest(".nav-item").dataset.view;
      switchView(viewId);
    });
  });
  
  // Importer Events
  document.getElementById("btn-process-import")?.addEventListener("click", processRawImport);
  document.getElementById("csv-file-input")?.addEventListener("change", handleCsvFileSelect);
  
  const dropZone = document.getElementById("csv-drop-zone");
  dropZone?.addEventListener("dragover", (e) => { e.preventDefault(); dropZone.classList.add("drag-over"); });
  dropZone?.addEventListener("dragleave", () => dropZone.classList.remove("drag-over"));
  dropZone?.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    const file = e.dataTransfer.files[0];
    if (file) handleCsvFile(file);
  });
  
  // Backup Events
  document.getElementById("btn-export-json")?.addEventListener("click", exportRosterJSON);
  document.getElementById("json-file-input")?.addEventListener("change", importRosterJSON);
  document.getElementById("btn-reset-seed")?.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset everything back to the starting spreadsheet roster? Any linked characters or raid assignments will be lost.")) {
      loadSeedRoster();
      saveToLocalStorage();
      renderCurrentView();
      showToast("Roster reset to spreadsheet seed data", "warning");
    }
  });

  // Modal Close Events
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  document.querySelectorAll(".close-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const overlay = btn.closest(".modal-overlay");
      if (overlay) closeModal(overlay.id);
    });
  });

  // Add Member Dialog Form Handler
  document.getElementById("add-member-form")?.addEventListener("submit", handleAddMemberSubmit);
  document.getElementById("btn-open-add-member")?.addEventListener("click", () => openModal("modal-add-member"));
  document.getElementById("btn-sync-all-dash")?.addEventListener("click", syncAllRoster);
  document.getElementById("attendance-form")?.addEventListener("submit", handleAttendanceSubmit);
  document.getElementById("attendance-team-filter")?.addEventListener("change", renderAttendanceView);
  document.getElementById("loot-form")?.addEventListener("submit", handleLootSubmit);

  // Initial Renders
  switchView("dashboard");
  setupSearchAndFilters();
  setupRaidPlannerDragAndDrop();
}

function loadSeedRoster() {
  state.players = SEED_ROSTER.map(p => {
    // Parse Sorts into clean array
    const parts = p.Sorts ? p.Sorts.split(",").map(s => s.trim()) : [];
    // Default raid team based on Sorts
    let defaultTeam = "Unassigned";
    if (parts.includes("Wed/Thu") && parts.includes("Mon/Tues")) {
      defaultTeam = "Mon/Tues"; // Put in Mon/Tues as primary, can adjust
    } else if (parts.includes("Wed/Thu")) {
      defaultTeam = "Wed/Thu";
    } else if (parts.includes("Mon/Tues")) {
      defaultTeam = "Mon/Tues";
    } else if (parts.includes("Backup")) {
      defaultTeam = "Backup";
    }

    return {
      id: p.PlayerID.toLowerCase().replace(/[^a-z0-9]/g, ""),
      name: p.PlayerID,
      status: "Active",
      dkp: p.DKP,
      sorts: parts,
      attendance: p.Attendance || 0.00,
      raidTeam: defaultTeam,
      notes: "",
      mainCharacter: {
        name: p.PlayerID,
        class: "Unknown",
        level: 0,
        race: "Unknown",
        synced: false
      },
      alts: []
    };
  });
}

function saveToLocalStorage() {
  localStorage.setItem("guild_manager_data", JSON.stringify(state.players));
  localStorage.setItem("guild_manager_attendance_log", JSON.stringify(state.attendanceLog || []));
  localStorage.setItem("guild_manager_loot_log", JSON.stringify(state.lootLog || []));
  localStorage.setItem("guild_manager_service_id", state.serviceId || "sukiecrisp");
  localStorage.setItem("guild_manager_server_name", state.serverName || "Wuoshi");
}

function migrateStoredData() {
  state.players = (state.players || []).map(p => ({
    status: "Active",
    ...p,
    alts: Array.isArray(p.alts) ? p.alts : [],
    sorts: Array.isArray(p.sorts) ? p.sorts : [],
    attendance: Number(p.attendance || 0),
    dkp: Number(p.dkp || 0),
    mainCharacter: { name: p.name || "Unknown", class: "Unknown", level: 0, race: "Unknown", synced: false, ...(p.mainCharacter || {}) }
  }));
  state.attendanceLog = Array.isArray(state.attendanceLog) ? state.attendanceLog : [];
  state.lootLog = Array.isArray(state.lootLog) ? state.lootLog : [];
}

// View Controller
function switchView(viewId) {
  state.activeView = viewId;
  
  // Update sidebar active state
  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.dataset.view === viewId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
  
  // Toggle views
  document.querySelectorAll(".app-view").forEach(view => {
    if (view.id === `view-${viewId}`) {
      view.classList.add("active-view");
    } else {
      view.classList.remove("active-view");
    }
  });

  renderCurrentView();
}

function renderCurrentView() {
  switch (state.activeView) {
    case "dashboard":
      renderDashboard();
      break;
    case "roster":
      renderRosterTable();
      break;
    case "planner":
      renderRaidPlanner();
      break;
    case "attendance":
      renderAttendanceView();
      break;
    case "loot":
      renderLootView();
      break;
    case "settings":
      // No special render needed, static inputs
      break;
  }
}

// Toast Controller
function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let icon = `
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  `;
  if (type === "success") {
    icon = `
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    `;
  } else if (type === "error") {
    icon = `
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `;
  }
  
  toast.innerHTML = `${icon}<span>${message}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px) scale(0.95)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Modal Controllers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add("open");
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("open");
}

// EverQuest II Census Integration Client (JSONP)
function fetchCensusCharacter(charName) {
  return new Promise((resolve, reject) => {
    // Basic sanitization
    const cleanName = charName.trim().replace(/[^a-zA-Z]/g, "");
    if (!cleanName) return reject(new Error("Invalid character name"));

    const callbackName = "census_cb_" + Math.random().toString(36).substr(2, 9);
    
    // Setup script element
    const serverName = encodeURIComponent(state.serverName || "Wuoshi");
    const url = `https://census.daybreakgames.com/s:${state.serviceId}/json/get/eq2/character/?name.first=${cleanName}&locationdata.world=${serverName}&c:limit=5&c:sort=last_update:-1&c:show=id,displayname,name,type,guild,locationdata,last_update&callback=${callbackName}`;
    const script = document.createElement("script");
    script.src = url;
    script.id = callbackName;
    
    // Setup timeout safety
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("Census sync timed out. Make sure the name is spelled correctly."));
    }, 8000);

    function cleanup() {
      clearTimeout(timeoutId);
      document.getElementById(callbackName)?.remove();
      delete window[callbackName];
    }

    // Assign global callback function for JSONP wrapper
    window[callbackName] = function(data) {
      cleanup();
      if (data && data.character_list && data.character_list.length > 0) {
        resolve(data.character_list[0]);
      } else {
        reject(new Error(`Character "${cleanName}" not found on "${state.serverName || "Wuoshi"}" in EQ2 Census database.`));
      }
    };

    script.onerror = function() {
      cleanup();
      reject(new Error("Network error connecting to Daybreak Games Census API."));
    };

    document.body.appendChild(script);
  });
}

// Sync character in state
async function syncPlayerCensus(playerId, isAlt = false, altIndex = -1) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;

  const targetCharName = (isAlt && altIndex >= 0) ? player.alts[altIndex].name : player.mainCharacter.name;
  
  showToast(`Syncing ${targetCharName} on ${state.serverName || "Wuoshi"}...`, "info");
  
  try {
    const charData = await fetchCensusCharacter(targetCharName);
    const type = charData.type || {};
    
    const updatedChar = {
      censusId: charData.id || charData.character_id || "",
      name: charData.name?.first || targetCharName,
      displayName: charData.displayname || `${charData.name?.first || targetCharName} (${state.serverName || "Wuoshi"})`,
      class: type.class || "Unknown",
      level: type.level || 0,
      race: type.race || "Unknown",
      guild: charData.guild?.name || "None",
      server: charData.locationdata?.world || state.serverName || "Wuoshi",
      lastUpdate: charData.last_update || "",
      synced: true
    };
    
    if (isAlt && altIndex >= 0) {
      player.alts[altIndex] = updatedChar;
    } else {
      player.mainCharacter = updatedChar;
      // Auto-update player name casing based on correct Census name
      player.name = updatedChar.name;
    }

    saveToLocalStorage();
    renderCurrentView();
    if (state.editingPlayerId === playerId) {
      renderPlayerDetailsModal(playerId); // Refresh edit modal if open
    }
    showToast(`Successfully synced "${updatedChar.name}"!`, "success");
  } catch (error) {
    showToast(error.message, "error");
  }
}

// Sync all main characters in the roster
async function syncAllRoster() {
  const playersToSync = state.players.filter(p => p.name !== "Guild Bank" && p.name !== "Anonymous" && p.name !== "System" && p.name !== "Broker");
  if (playersToSync.length === 0) return;

  showToast(`Starting bulk sync of ${playersToSync.length} characters...`, "info");
  
  let successCount = 0;
  let failCount = 0;

  // Process sequentially to respect rate limits gently
  for (let i = 0; i < playersToSync.length; i++) {
    const player = playersToSync[i];
    try {
      const charData = await fetchCensusCharacter(player.mainCharacter.name);
      const type = charData.type || {};
      
      player.mainCharacter = {
        censusId: charData.id || charData.character_id || "",
        name: charData.name?.first || player.mainCharacter.name,
        displayName: charData.displayname || `${charData.name?.first || player.mainCharacter.name} (${state.serverName || "Wuoshi"})`,
        class: type.class || "Unknown",
        level: type.level || 0,
        race: type.race || "Unknown",
        guild: charData.guild?.name || "None",
        server: charData.locationdata?.world || state.serverName || "Wuoshi",
        lastUpdate: charData.last_update || "",
        synced: true
      };
      player.name = player.mainCharacter.name;
      successCount++;
    } catch (e) {
      console.warn(`Failed to sync ${player.mainCharacter.name}:`, e.message);
      failCount++;
    }
    // Pause briefly between requests
    await new Promise(r => setTimeout(r, 200));
  }

  saveToLocalStorage();
  renderCurrentView();
  showToast(`Bulk Sync Finished! Success: ${successCount}, Failed: ${failCount}`, "success");
}

// Dashboard Page Renderer
function renderDashboard() {
  const players = state.players;
  const mainCharacters = players.map(p => p.mainCharacter);
  
  // Total Characters (Mains + Alts)
  let totalChars = 0;
  let tankCount = 0;
  let healerCount = 0;
  let mageCount = 0;
  let scoutCount = 0;
  let unassignedClasses = 0;
  let syncedCount = 0;

  players.forEach(p => {
    totalChars += 1 + p.alts.length;
    
    // Add Main
    if (p.mainCharacter.synced) {
      syncedCount++;
      const role = CLASS_ROLE_MAP[p.mainCharacter.class];
      if (role === "tank") tankCount++;
      else if (role === "healer") healerCount++;
      else if (role === "mage") mageCount++;
      else if (role === "scout") scoutCount++;
      else unassignedClasses++;
    } else {
      unassignedClasses++;
    }
    
    // Add Alts
    p.alts.forEach(alt => {
      if (alt.synced) {
        syncedCount++;
        const role = CLASS_ROLE_MAP[alt.class];
        if (role === "tank") tankCount++;
        else if (role === "healer") healerCount++;
        else if (role === "mage") mageCount++;
        else if (role === "scout") scoutCount++;
        else unassignedClasses++;
      } else {
        unassignedClasses++;
      }
    });
  });

  // Calculate Average DKP
  const playersWithDKP = players.filter(p => p.name !== "Guild Bank" && p.name !== "Broker");
  const totalDKP = players.reduce((sum, p) => sum + p.dkp, 0);
  const avgDKP = playersWithDKP.length ? Math.round(totalDKP / playersWithDKP.length) : 0;
  
  // Render Stat Cards
  document.getElementById("stat-total-players").innerText = players.length;
  document.getElementById("stat-total-chars").innerText = totalChars;
  document.getElementById("stat-avg-dkp").innerText = avgDKP;
  document.getElementById("stat-census-sync").innerText = `${syncedCount}/${totalChars}`;
  
  // Team Sizes
  const monTuesCount = players.filter(p => p.raidTeam === "Mon/Tues").length;
  const wedThuCount = players.filter(p => p.raidTeam === "Wed/Thu").length;
  const backupCount = players.filter(p => p.raidTeam === "Backup").length;
  const unassignedCount = players.filter(p => p.raidTeam === "Unassigned").length;

  document.getElementById("team-mon-tues-count").innerText = monTuesCount;
  document.getElementById("team-wed-thu-count").innerText = wedThuCount;
  document.getElementById("team-backup-count").innerText = backupCount;
  document.getElementById("team-unassigned-count").innerText = unassignedCount;
  
  // Class/Role Breakdown Render
  const rolesTotal = tankCount + healerCount + mageCount + scoutCount;
  
  renderRoleBar("role-tank-bar", "role-tank-val", tankCount, rolesTotal);
  renderRoleBar("role-healer-bar", "role-healer-val", healerCount, rolesTotal);
  renderRoleBar("role-mage-bar", "role-mage-val", mageCount, rolesTotal);
  renderRoleBar("role-scout-bar", "role-scout-val", scoutCount, rolesTotal);

  // Render recent activity or notification panel
  const unsyncedCount = totalChars - syncedCount;
  const alertPanel = document.getElementById("dashboard-alerts");
  if (alertPanel) {
    if (unsyncedCount > 0) {
      alertPanel.innerHTML = `
        <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.15); border-radius: 12px; padding: 1rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="color: var(--accent-danger); font-size: 1.25rem;">⚠️</div>
            <div>
              <h4 style="font-weight: 600; font-size: 0.9rem;">Roster Requires Census Sync</h4>
              <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">There are ${unsyncedCount} characters in your roster that are not synchronized with the Daybreak Games Census database.</p>
            </div>
          </div>
          <button class="btn btn-sm btn-primary" id="btn-sync-all-warn">Sync All Characters</button>
        </div>
      `;
      document.getElementById("btn-sync-all-warn")?.addEventListener("click", syncAllRoster);
    } else {
      alertPanel.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.08); border: 1px solid rgba(16, 185, 129, 0.15); border-radius: 12px; padding: 1rem; display: flex; align-items: center; gap: 0.75rem;">
          <div style="color: var(--accent-success); font-size: 1.25rem;">✨</div>
          <div>
            <h4 style="font-weight: 600; font-size: 0.9rem;">Roster Synchronized</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.15rem;">All characters are verified and synchronized with the Daybreak Games Census API!</p>
          </div>
        </div>
      `;
    }
  }
}

function renderRoleBar(barId, valId, count, total) {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;
  const bar = document.getElementById(barId);
  const val = document.getElementById(valId);
  
  if (bar) bar.style.width = `${percentage}%`;
  if (val) val.innerHTML = `<strong>${count}</strong> <span style="font-size:0.75rem; color:var(--text-dim);">(${percentage}%)</span>`;
}

// Roster Table Section
let rosterFilters = {
  search: "",
  role: "all",
  team: "all",
  sync: "all"
};

function setupSearchAndFilters() {
  document.getElementById("roster-search")?.addEventListener("input", (e) => {
    rosterFilters.search = e.target.value.toLowerCase();
    renderRosterTable();
  });
  
  document.getElementById("filter-role")?.addEventListener("change", (e) => {
    rosterFilters.role = e.target.value;
    renderRosterTable();
  });
  
  document.getElementById("filter-team")?.addEventListener("change", (e) => {
    rosterFilters.team = e.target.value;
    renderRosterTable();
  });

  document.getElementById("filter-sync")?.addEventListener("change", (e) => {
    rosterFilters.sync = e.target.value;
    renderRosterTable();
  });

  document.getElementById("btn-sync-all-roster")?.addEventListener("click", syncAllRoster);
}

function renderRosterTable() {
  const tbody = document.getElementById("roster-table-body");
  if (!tbody) return;

  const filtered = state.players.filter(p => {
    // Search Filter (Player name or main class)
    const matchesSearch = p.name.toLowerCase().includes(rosterFilters.search) || 
                          p.mainCharacter.class.toLowerCase().includes(rosterFilters.search);
    
    // Team Filter
    const matchesTeam = rosterFilters.team === "all" || p.raidTeam === rosterFilters.team;
    
    // Census Sync Filter
    const matchesSync = rosterFilters.sync === "all" || 
                        (rosterFilters.sync === "synced" && p.mainCharacter.synced) ||
                        (rosterFilters.sync === "unsynced" && !p.mainCharacter.synced);
    
    // Role Filter
    const mainRole = p.mainCharacter.synced ? CLASS_ROLE_MAP[p.mainCharacter.class] || "unassigned" : "unassigned";
    const matchesRole = rosterFilters.role === "all" || mainRole === rosterFilters.role;

    return matchesSearch && matchesTeam && matchesSync && matchesRole;
  });

  // Sort by name by default (case insensitive)
  filtered.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-dim); padding: 3rem 0;">No matching players found in the roster.</td></tr>`;
    return;
  }

  filtered.forEach(p => {
    const row = document.createElement("tr");
    
    const role = p.mainCharacter.synced ? CLASS_ROLE_MAP[p.mainCharacter.class] || "unassigned" : "unassigned";
    const roleBadge = `<span class="badge badge-role ${role}">${role}</span>`;
    
    const teamBadge = `<span class="badge" style="background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid rgba(255,255,255,0.08);">${p.raidTeam}</span>`;
    
    const classLabel = `
      <div class="class-label">
        <span class="class-dot ${role}"></span>
        <span>${p.mainCharacter.class || "Unknown"}</span>
      </div>
    `;

    const syncStatus = `
      <div class="sync-status ${p.mainCharacter.synced ? 'synced' : 'unsynced'}">
        <span class="sync-pulse"></span>
        <span>${p.mainCharacter.synced ? 'Synced' : 'Not Synced'}</span>
      </div>
    `;

    row.innerHTML = `
      <td style="font-weight: 600; color: var(--text-main); font-size: 0.95rem;">${p.name}</td>
      <td>${classLabel}</td>
      <td>${p.mainCharacter.level || "-"}</td>
      <td>${roleBadge}</td>
      <td style="font-family: monospace; font-weight: 600; color: var(--accent-primary);">${p.dkp} DKP</td>
      <td>${teamBadge}</td>
      <td>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-sm" onclick="openPlayerEditModal('${p.id}')">Manage</button>
          <button class="btn btn-sm btn-icon-only" title="Sync with Census" onclick="syncPlayerCensus('${p.id}')">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// Player Management / Details Modal Rendering
function openPlayerEditModal(playerId) {
  state.editingPlayerId = playerId;
  renderPlayerDetailsModal(playerId);
  openModal("modal-player-details");
}

function renderPlayerDetailsModal(playerId) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;

  // Title & Basic Info
  document.getElementById("modal-player-title").innerText = `Manage Player: ${player.name}`;
  document.getElementById("edit-player-name").value = player.name;
  document.getElementById("edit-player-dkp").value = player.dkp;
  document.getElementById("edit-player-team").value = player.raidTeam;
  document.getElementById("edit-player-notes").value = player.notes || "";

  // Main Character Box
  const main = player.mainCharacter;
  const mainRole = main.synced ? CLASS_ROLE_MAP[main.class] || "unassigned" : "unassigned";
  
  document.getElementById("main-char-box").innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
      <div>
        <h4 style="font-weight: 700; font-size: 1.05rem;">${main.name} <span style="font-size:0.75rem; color:var(--text-dim);">[Main]</span></h4>
        <div style="margin-top: 0.25rem; font-size: 0.82rem; color: var(--text-muted); display: flex; gap: 0.75rem;">
          <span>Class: <strong style="color:var(--text-main);">${main.class}</strong></span>
          <span>Level: <strong style="color:var(--text-main);">${main.level || "-"}</strong></span>
          <span>Race: <strong style="color:var(--text-main);">${main.race}</strong></span>
        </div>
        ${main.guild ? `<div style="font-size:0.75rem; color:var(--accent-primary); margin-top:0.2rem;">Guild: ${main.guild}</div>` : ""}
      </div>
      <button class="btn btn-sm btn-primary" onclick="syncPlayerCensus('${player.id}', false)">
        Sync Census
      </button>
    </div>
  `;

  // Alts List
  const altsListContainer = document.getElementById("alts-list-container");
  if (altsListContainer) {
    altsListContainer.innerHTML = "";
    if (player.alts.length === 0) {
      altsListContainer.innerHTML = `<div style="text-align:center; color:var(--text-dim); font-size:0.8rem; padding:0.5rem 0;">No alt characters linked.</div>`;
    } else {
      player.alts.forEach((alt, idx) => {
        const altRow = document.createElement("div");
        altRow.className = "alt-item";
        const altRole = alt.synced ? CLASS_ROLE_MAP[alt.class] || "unassigned" : "unassigned";
        
        altRow.innerHTML = `
          <div class="alt-name">
            <span class="class-dot ${altRole}"></span>
            <span>${alt.name} <span style="font-size:0.75rem; color:var(--text-muted);">(${alt.class} Lvl ${alt.level || '-'})</span></span>
          </div>
          <div style="display: flex; gap: 0.3rem;">
            <button class="member-card-btn" title="Sync Alt Census" onclick="syncPlayerCensus('${player.id}', true, ${idx})">
              <svg width="12" height="12" viewBox="0 0 24 24"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path></svg>
            </button>
            <button class="member-card-btn" title="Delete Alt" onclick="removePlayerAlt('${player.id}', ${idx})" style="color:var(--accent-danger);">
              <svg width="12" height="12" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        `;
        altsListContainer.appendChild(altRow);
      });
    }
  }

  // Bind Alt Creation Forms
  document.getElementById("btn-add-alt").onclick = () => {
    const input = document.getElementById("add-alt-name");
    const name = input.value.trim();
    if (name) {
      player.alts.push({
        name: name,
        class: "Unknown",
        level: 0,
        race: "Unknown",
        synced: false
      });
      input.value = "";
      saveToLocalStorage();
      renderPlayerDetailsModal(playerId);
      renderCurrentView();
      showToast(`Linked alt "${name}" to ${player.name}`, "success");
      // Auto-trigger census sync for the newly added alt
      syncPlayerCensus(playerId, true, player.alts.length - 1);
    }
  };

  // Bind Main Save Actions
  document.getElementById("btn-save-player-details").onclick = () => {
    const nameVal = document.getElementById("edit-player-name").value.trim();
    const dkpVal = parseInt(document.getElementById("edit-player-dkp").value) || 0;
    const teamVal = document.getElementById("edit-player-team").value;
    const notesVal = document.getElementById("edit-player-notes").value;

    if (!nameVal) {
      showToast("Player Name cannot be blank", "error");
      return;
    }

    player.name = nameVal;
    player.dkp = dkpVal;
    player.raidTeam = teamVal;
    player.notes = notesVal;

    saveToLocalStorage();
    closeModal("modal-player-details");
    renderCurrentView();
    showToast(`Saved changes for ${player.name}`, "success");
  };

  // Bind Delete Player Action
  document.getElementById("btn-delete-player").onclick = () => {
    if (confirm(`Are you absolutely sure you want to delete ${player.name} and all linked characters? This action cannot be undone.`)) {
      state.players = state.players.filter(p => p.id !== playerId);
      saveToLocalStorage();
      closeModal("modal-player-details");
      renderCurrentView();
      showToast(`Deleted player profile and characters.`, "warning");
    }
  };
}

function removePlayerAlt(playerId, altIndex) {
  const player = state.players.find(p => p.id === playerId);
  if (!player) return;
  
  const altName = player.alts[altIndex]?.name || "";
  player.alts.splice(altIndex, 1);
  saveToLocalStorage();
  renderPlayerDetailsModal(playerId);
  renderCurrentView();
  showToast(`Removed alt character "${altName}"`, "warning");
}

function handleAddMemberSubmit(e) {
  e.preventDefault();
  const nameVal = document.getElementById("add-member-name").value.trim();
  const dkpVal = parseInt(document.getElementById("add-member-dkp").value) || 0;
  const teamVal = document.getElementById("add-member-team").value;
  const rawAvailability = document.getElementById("add-member-availability").value;
  
  if (!nameVal) {
    showToast("Character Name is required", "error");
    return;
  }

  const generatedId = nameVal.toLowerCase().replace(/[^a-z0-9]/g, "");
  if (state.players.some(p => p.id === generatedId)) {
    showToast("A player with this name already exists", "error");
    return;
  }

  const availability = rawAvailability ? rawAvailability.split(",").map(s => s.trim()) : [];

  const newPlayer = {
    id: generatedId,
    name: nameVal,
    status: "Active",
    dkp: dkpVal,
    sorts: availability,
    attendance: 0.0,
    raidTeam: teamVal,
    notes: "",
    mainCharacter: {
      name: nameVal,
      class: "Unknown",
      level: 0,
      race: "Unknown",
      synced: false
    },
    alts: []
  };

  state.players.push(newPlayer);
  saveToLocalStorage();
  closeModal("modal-add-member");
  renderCurrentView();
  
  // Clear inputs
  document.getElementById("add-member-form").reset();
  showToast(`Created profile for "${nameVal}"`, "success");
  
  // Auto-sync
  syncPlayerCensus(generatedId, false);
}

// Raid Planner Section
function renderRaidPlanner() {
  const unassignedContainer = document.getElementById("roster-unassigned");
  const monTuesContainer = document.getElementById("roster-mon-tues");
  const wedThuContainer = document.getElementById("roster-wed-thu");
  const backupContainer = document.getElementById("roster-backup");

  if (!unassignedContainer || !monTuesContainer || !wedThuContainer || !backupContainer) return;

  // Clear rosters
  unassignedContainer.innerHTML = "";
  monTuesContainer.innerHTML = "";
  wedThuContainer.innerHTML = "";
  backupContainer.innerHTML = "";

  // Sort players alphabetically
  const sortedPlayers = [...state.players].sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  sortedPlayers.forEach(p => {
    const card = document.createElement("div");
    card.className = "member-card";
    card.draggable = true;
    card.dataset.id = p.id;

    // Check Class/Role
    const mainChar = p.mainCharacter;
    const role = mainChar.synced ? CLASS_ROLE_MAP[mainChar.class] || "unassigned" : "unassigned";
    const classInfo = mainChar.synced ? `${mainChar.class} Lvl ${mainChar.level}` : "Not Synced";
    
    // Sorts tooltip info
    const sortsLabel = p.sorts.length ? p.sorts.join(", ") : "No schedule listed";

    card.innerHTML = `
      <div class="member-card-details">
        <div class="member-card-name">
          <span class="class-dot ${role}" title="Role: ${role}"></span>
          <span>${p.name}</span>
        </div>
        <div class="member-card-sub" title="Availability: ${sortsLabel}">${classInfo} | ${p.dkp} DKP</div>
      </div>
      <div class="member-card-actions">
        <select onchange="movePlayerTeamDirect('${p.id}', this.value)" style="background:transparent; border:none; color:var(--text-dim); font-size:0.7rem; cursor:pointer;" title="Assign Team">
          <option value="Unassigned" ${p.raidTeam === 'Unassigned' ? 'selected' : ''}>Unassign</option>
          <option value="Mon/Tues" ${p.raidTeam === 'Mon/Tues' ? 'selected' : ''}>Mon/Tues</option>
          <option value="Wed/Thu" ${p.raidTeam === 'Wed/Thu' ? 'selected' : ''}>Wed/Thu</option>
          <option value="Backup" ${p.raidTeam === 'Backup' ? 'selected' : ''}>Backup</option>
        </select>
        <button class="member-card-btn" title="Edit Profile" onclick="openPlayerEditModal('${p.id}')">
          <svg width="12" height="12" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
      </div>
    `;

    // Bind Drag Actions
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", p.id);
      card.style.opacity = "0.5";
    });
    
    card.addEventListener("dragend", () => {
      card.style.opacity = "1";
    });

    // Append to respective containers
    if (p.raidTeam === "Mon/Tues") {
      monTuesContainer.appendChild(card);
    } else if (p.raidTeam === "Wed/Thu") {
      wedThuContainer.appendChild(card);
    } else if (p.raidTeam === "Backup") {
      backupContainer.appendChild(card);
    } else {
      unassignedContainer.appendChild(card);
    }
  });

  // Update counts
  document.getElementById("unassigned-count").innerText = sortedPlayers.filter(p => p.raidTeam === "Unassigned").length;
  document.getElementById("mon-tues-count").innerText = sortedPlayers.filter(p => p.raidTeam === "Mon/Tues").length;
  document.getElementById("wed-thu-count").innerText = sortedPlayers.filter(p => p.raidTeam === "Wed/Thu").length;
  document.getElementById("backup-count").innerText = sortedPlayers.filter(p => p.raidTeam === "Backup").length;

  // Run dynamic composition calculator
  calculateRaidComposition();
}

function movePlayerTeamDirect(playerId, teamName) {
  const player = state.players.find(p => p.id === playerId);
  if (player) {
    player.raidTeam = teamName;
    saveToLocalStorage();
    renderRaidPlanner();
    showToast(`Assigned ${player.name} to ${teamName}`, "success");
  }
}

// Drag & Drop event bindings
function setupRaidPlannerDragAndDrop() {
  const lists = document.querySelectorAll(".team-roster");
  
  lists.forEach(list => {
    list.addEventListener("dragover", (e) => {
      e.preventDefault();
      list.classList.add("drag-over");
    });
    
    list.addEventListener("dragleave", () => {
      list.classList.remove("drag-over");
    });
    
    list.addEventListener("drop", (e) => {
      e.preventDefault();
      list.classList.remove("drag-over");
      
      const playerId = e.dataTransfer.getData("text/plain");
      const targetTeam = list.dataset.team; // e.g. Mon/Tues, Wed/Thu, Backup, Unassigned
      
      movePlayerTeamDirect(playerId, targetTeam);
    });
  });
}

function calculateRaidComposition() {
  // We calculate stats for Mon/Tues and Wed/Thu teams
  computeTeamStats("Mon/Tues");
  computeTeamStats("Wed/Thu");
}

function computeTeamStats(teamName) {
  const teamPlayers = state.players.filter(p => p.raidTeam === teamName);
  
  let tanks = 0;
  let healers = 0;
  let mages = 0;
  let scouts = 0;
  
  teamPlayers.forEach(p => {
    const main = p.mainCharacter;
    if (main.synced) {
      const role = CLASS_ROLE_MAP[main.class];
      if (role === "tank") tanks++;
      else if (role === "healer") healers++;
      else if (role === "mage") mages++;
      else if (role === "scout") scouts++;
    }
  });

  const containerPrefix = teamName.toLowerCase().replace("/", "-");
  
  const tankEl = document.getElementById(`${containerPrefix}-tanks`);
  const healerEl = document.getElementById(`${containerPrefix}-healers`);
  const mageEl = document.getElementById(`${containerPrefix}-mages`);
  const scoutEl = document.getElementById(`${containerPrefix}-scouts`);

  if (tankEl) tankEl.innerText = tanks;
  if (healerEl) healerEl.innerText = healers;
  if (mageEl) mageEl.innerText = mages;
  if (scoutEl) scoutEl.innerText = scouts;
}

// CSV Spreadsheets Importer Logic
function handleCsvFileSelect(e) {
  const file = e.target.files[0];
  if (file) handleCsvFile(file);
}

function handleCsvFile(file) {
  const reader = new FileReader();
  reader.onload = function(evt) {
    const txt = evt.target.result;
    document.getElementById("import-text-area").value = txt;
    showToast(`Loaded file: ${file.name}. Review fields and click Process.`, "info");
  };
  reader.readAsText(file);
}

function processRawImport() {
  const txt = document.getElementById("import-text-area").value.trim();
  if (!txt) {
    showToast("Please paste CSV data or select a file first", "error");
    return;
  }

  try {
    const parsedData = parseCSV(txt);
    if (parsedData.length === 0) {
      showToast("No valid rows could be parsed from the input.", "error");
      return;
    }

    // Determine column mapping dynamically
    const headers = Object.keys(parsedData[0]);
    
    // Look for matching names
    const playerCol = headers.find(h => /player|name|character|char/i.test(h));
    const dkpCol = headers.find(h => /dkp|point/i.test(h));
    const sortCol = headers.find(h => /sort|raid|sched|avail/i.test(h));
    const attCol = headers.find(h => /percent|attendance|90/i.test(h));

    if (!playerCol) {
      showToast("Could not find a Player/Character Name column header.", "error");
      return;
    }

    let successCount = 0;
    
    parsedData.forEach(row => {
      const pName = row[playerCol]?.trim();
      if (!pName || pName.toLowerCase() === "playerid" || pName.toLowerCase() === "guild bank" || pName.toLowerCase() === "anonymous") return;

      const pDkp = dkpCol ? parseInt(row[dkpCol].replace(/[^0-9]/g, "")) || 0 : 0;
      const pSorts = sortCol ? row[sortCol] : "";
      const pAtt = attCol ? parseFloat(row[attCol].replace(/[^0-9.]/g, "")) || 0.0 : 0.0;
      
      const generatedId = pName.toLowerCase().replace(/[^a-z0-9]/g, "");

      // Check if player already exists
      const existing = state.players.find(p => p.id === generatedId);
      
      const sortsArr = pSorts ? pSorts.split(",").map(s => s.trim()) : [];
      let defaultTeam = "Unassigned";
      if (sortsArr.includes("Wed/Thu") && sortsArr.includes("Mon/Tues")) defaultTeam = "Mon/Tues";
      else if (sortsArr.includes("Wed/Thu")) defaultTeam = "Wed/Thu";
      else if (sortsArr.includes("Mon/Tues")) defaultTeam = "Mon/Tues";
      else if (sortsArr.includes("Backup")) defaultTeam = "Backup";

      if (existing) {
        // Merge DKP and schedule, preserve notes / alts
        existing.dkp = pDkp;
        existing.sorts = sortsArr;
        existing.attendance = pAtt;
        existing.raidTeam = defaultTeam;
      } else {
        // Create new
        state.players.push({
          id: generatedId,
          name: pName,
          dkp: pDkp,
          sorts: sortsArr,
          attendance: pAtt,
          raidTeam: defaultTeam,
          notes: "",
          mainCharacter: {
            name: pName,
            class: "Unknown",
            level: 0,
            race: "Unknown",
            synced: false
          },
          alts: []
        });
      }
      successCount++;
    });

    saveToLocalStorage();
    switchView("roster");
    showToast(`Successfully processed and imported ${successCount} players!`, "success");
    document.getElementById("import-text-area").value = "";
  } catch (error) {
    showToast(`Import error: ${error.message}`, "error");
  }
}

// Custom CSV Parser with Quotes Handling
function parseCSV(text) {
  const lines = [];
  let row = [""];
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i+1];
    
    if (c === '"') {
      if (inQuotes && next === '"') {
        row[row.length - 1] += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      row.push('');
    } else if ((c === '\r' || c === '\n') && !inQuotes) {
      if (c === '\r' && next === '\n') { i++; } // handle CRLF
      lines.push(row);
      row = [''];
    } else {
      row[row.length - 1] += c;
    }
  }
  if (row.length > 1 || row[0] !== '') {
    lines.push(row);
  }
  
  if (lines.length < 2) return [];

  const headers = lines[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const data = [];
  
  for (let idx = 1; idx < lines.length; idx++) {
    const values = lines[idx];
    if (values.length < headers.length) continue; // skip incomplete rows
    
    const obj = {};
    for (let hIdx = 0; hIdx < headers.length; hIdx++) {
      obj[headers[hIdx]] = values[hIdx]?.trim().replace(/^"|"$/g, '') || '';
    }
    data.push(obj);
  }
  return data;
}



// Attendance and Loot MVP
function getActivePlayers() {
  return state.players.filter(p => (p.status || "Active") !== "Inactive" && (p.status || "Active") !== "Former Member");
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function renderAttendanceView() {
  const dateInput = document.getElementById("attendance-date");
  if (dateInput && !dateInput.value) dateInput.value = todayISO();

  const team = document.getElementById("attendance-team-filter")?.value || "Mon/Tues";
  const list = document.getElementById("attendance-player-list");
  if (!list) return;

  const players = getActivePlayers()
    .filter(p => team === "All" || p.raidTeam === team || (p.sorts || []).includes(team))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));

  list.innerHTML = players.map(p => `
    <label class="check-row">
      <input type="checkbox" name="attendance-player" value="${p.id}">
      <span><strong>${p.name}</strong><small>${p.raidTeam || "Unassigned"} • ${p.dkp} DKP</small></span>
    </label>
  `).join("") || `<div class="empty-state">No players found for this team.</div>`;

  renderAttendanceHistory();
}

function handleAttendanceSubmit(e) {
  e.preventDefault();
  const date = document.getElementById("attendance-date")?.value || todayISO();
  const team = document.getElementById("attendance-team-filter")?.value || "Mon/Tues";
  const attendanceDkp = Number(document.getElementById("attendance-dkp")?.value || 0);
  const signupDkp = Number(document.getElementById("signup-dkp")?.value || 0);
  const notes = document.getElementById("attendance-notes")?.value || "";
  const selected = [...document.querySelectorAll('input[name="attendance-player"]:checked')].map(cb => cb.value);

  if (!selected.length) {
    showToast("Select at least one attendee.", "error");
    return;
  }

  const totalAward = attendanceDkp + signupDkp;
  selected.forEach(playerId => {
    const p = state.players.find(x => x.id === playerId);
    if (p) p.dkp = Number(p.dkp || 0) + totalAward;
  });

  state.attendanceLog.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date, team, attendanceDkp, signupDkp, totalAward, notes,
    playerIds: selected,
    createdAt: new Date().toISOString()
  });

  saveToLocalStorage();
  renderCurrentView();
  showToast(`Saved attendance for ${selected.length} players (+${totalAward} DKP each).`, "success");
}

function renderAttendanceHistory() {
  const box = document.getElementById("attendance-history");
  if (!box) return;
  const rows = (state.attendanceLog || []).slice(0, 10).map(ev => {
    const names = ev.playerIds.map(id => state.players.find(p => p.id === id)?.name || id).join(", ");
    return `<tr><td>${ev.date}</td><td>${ev.team}</td><td>${ev.playerIds.length}</td><td>+${ev.totalAward}</td><td>${names}</td></tr>`;
  }).join("");
  box.innerHTML = rows || `<tr><td colspan="5" class="empty-state">No attendance recorded yet.</td></tr>`;
}

function renderLootView() {
  const dateInput = document.getElementById("loot-date");
  if (dateInput && !dateInput.value) dateInput.value = todayISO();
  const select = document.getElementById("loot-player");
  if (select) {
    select.innerHTML = getActivePlayers()
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
      .map(p => `<option value="${p.id}">${p.name} (${p.dkp} DKP)</option>`).join("");
  }
  renderLootHistory();
}

function handleLootSubmit(e) {
  e.preventDefault();
  const playerId = document.getElementById("loot-player")?.value;
  const player = state.players.find(p => p.id === playerId);
  const item = document.getElementById("loot-item")?.value.trim();
  const cost = Number(document.getElementById("loot-cost")?.value || 0);
  const date = document.getElementById("loot-date")?.value || todayISO();
  const raid = document.getElementById("loot-raid")?.value || "";
  const notes = document.getElementById("loot-notes")?.value || "";
  if (!player || !item) {
    showToast("Choose a winner and enter an item name.", "error");
    return;
  }
  player.dkp = Number(player.dkp || 0) - cost;
  state.lootLog.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    date, playerId, playerName: player.name, item, cost, raid, notes,
    createdAt: new Date().toISOString()
  });
  saveToLocalStorage();
  document.getElementById("loot-form")?.reset();
  renderCurrentView();
  showToast(`Recorded ${item} for ${player.name} (-${cost} DKP).`, "success");
}

function renderLootHistory() {
  const box = document.getElementById("loot-history");
  if (!box) return;
  const rows = (state.lootLog || []).slice(0, 25).map(ev => `
    <tr><td>${ev.date}</td><td>${ev.playerName}</td><td>${ev.item}</td><td>-${ev.cost}</td><td>${ev.raid || ""}</td></tr>
  `).join("");
  box.innerHTML = rows || `<tr><td colspan="5" class="empty-state">No loot recorded yet.</td></tr>`;
}

// Backup Operations
function exportRosterJSON() {
  const exportData = {
    exportedAt: new Date().toISOString(),
    app: "CAB DKP",
    players: state.players,
    attendanceLog: state.attendanceLog || [],
    lootLog: state.lootLog || [],
    serviceId: state.serviceId || "sukiecrisp",
    serverName: state.serverName || "Wuoshi"
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  
  const timestamp = new Date().toISOString().slice(0, 10);
  downloadAnchor.setAttribute("download", `guild_manager_backup_${timestamp}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("Database exported successfully!", "success");
}

function importRosterJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data) && data.length > 0 && data[0].hasOwnProperty("mainCharacter")) {
        state.players = data;
        state.attendanceLog = [];
        state.lootLog = [];
        migrateStoredData();
        saveToLocalStorage();
        renderCurrentView();
        showToast(`Successfully imported legacy backup of ${data.length} players!`, "success");
      } else if (data && Array.isArray(data.players)) {
        state.players = data.players;
        state.attendanceLog = Array.isArray(data.attendanceLog) ? data.attendanceLog : [];
        state.lootLog = Array.isArray(data.lootLog) ? data.lootLog : [];
        state.serviceId = data.serviceId || state.serviceId;
        state.serverName = data.serverName || state.serverName || "Wuoshi";
        migrateStoredData();
        saveToLocalStorage();
        renderCurrentView();
        showToast(`Successfully imported full guild backup of ${state.players.length} players!`, "success");
      } else {
        showToast("Invalid JSON file schema. Make sure this is a backup created by this application.", "error");
      }
    } catch (err) {
      showToast("Failed to parse JSON file.", "error");
    }
  };
  reader.readAsText(file);
  e.target.value = ""; // Reset file input
}

// Save custom Service ID from settings panel
document.getElementById("btn-save-settings")?.addEventListener("click", () => {
  const sIdInput = document.getElementById("settings-service-id");
  const serverInput = document.getElementById("settings-server-name");
  const sId = sIdInput?.value.trim();
  const serverName = serverInput?.value.trim() || "Wuoshi";
  if (sId) {
    state.serviceId = sId;
    state.serverName = serverName;
    saveToLocalStorage();
    showToast(`Census settings saved: ${serverName} using service ID ${sId}`, "success");
  } else {
    showToast("Service ID cannot be blank", "error");
  }
});

// Run Init on DOM load
window.addEventListener("DOMContentLoaded", initApp);
