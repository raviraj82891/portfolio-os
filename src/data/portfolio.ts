export const PERSONAL = {
  name: 'Raviraj Sharma',
  handle: 'raviraj',
  hostname: 'raviraj-os',
  title: 'Full-Stack Developer & Cyber Security Specialist',
  bio: `I'm a dedicated student with a solid understanding of web technologies and programming languages like C, C++, and Java. I enjoy learning new tools and building projects that solve real-world problems. My goal is to grow as a full-stack developer and contribute to impactful tech solutions.`,
  email: 'ravirajsharma82891@gmail.com',
  github: 'https://github.com/raviraj82891',
  linkedin: 'https://www.linkedin.com/in/raviraj-sharma-969264289/?skipRedirect=true',
  instagram: 'https://www.instagram.com/_raviii__raj_?igsh=ZXJhOTE2Y3prZnll',
  twitter: 'https://twitter.com/raviraj_sharma',
  location: 'India',
  university: 'Lovely Professional University',
  profilePhoto: '/asset/images/profile.jpg',
  resumeUrl: '/asset/pdfs/My_resume.pdf',
};

export const SKILLS = {
  frontend: ['HTML', 'CSS', 'TailwindCSS', 'JavaScript', 'React', 'Next.js'],
  backend: ['JavaScript', 'Python', 'MySQL', 'Node.js'],
  languages: ['C', 'C++', 'Python', 'Java', 'TypeScript'],
  cyberSecurity: ['Linux', 'Networking', 'Digital Forensics', 'Penetration Testing'],
  gameEngines: ['Godot Engine', 'GDScript', 'Unity', 'C#'],
  tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Postman'],
};

export const EDUCATION = [
  {
    degree: 'BCA (Hons) in Cyber Security',
    institution: 'Lovely Professional University',
    period: 'Aug 2023 — Present',
    icon: '🎓',
  },
  {
    degree: 'Intermediate',
    institution: 'Vig English School',
    period: 'Apr 2021 — Mar 2023',
    icon: '📚',
  },
  {
    degree: 'Matriculation',
    institution: 'Vig English School',
    period: 'Apr 2020 — Mar 2021',
    icon: '🏫',
  },
];

export const CERTIFICATIONS = [
  { name: 'Securing Computing Systems', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142349.png' },
  { name: 'Securing Computing Systems II', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142410.png' },
  { name: 'Securing Computing Systems III', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142424.png' },
  { name: 'Securing Computing Systems IV', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142436.png' },
  { name: 'Securing Computing Systems V', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142454.png' },
  { name: 'Securing Computing Systems VI', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142507.png' },
  { name: 'Securing Computing Systems VII', issuer: 'Quick Heal Academy', image: '/asset/images/Screenshot_2026-05-19_142520.png' },
  { name: 'IBM SkillsBuild Data Analytics', issuer: 'IBM / ICT Academy', image: '/asset/images/IMG_3249.JPG.jpeg' },
  { name: 'Web Design for Everybody Capstone', issuer: 'Coursera / U of Michigan', image: '/asset/images/Screenshot_2025-07-24_135719.png' },
  { name: 'Artificial Intelligence Essentials', issuer: 'Coursera / UPenn', image: '/asset/images/Screenshot_2025-03-02_104636.png' },
  { name: 'Web Design for Everybody II', issuer: 'Coursera', image: '/asset/images/Screenshot_2025-07-24_135743.png' },
  { name: 'Web Design for Everybody III', issuer: 'Coursera', image: '/asset/images/Screenshot_2025-07-24_135812.png' },
  { name: 'Web Design for Everybody IV', issuer: 'Coursera', image: '/asset/images/Screenshot_2025-07-24_135831.png' },
  { name: 'Web Design for Everybody V', issuer: 'Coursera', image: '/asset/images/Screenshot_2025-07-24_135901.png' },
  { name: 'Web Design for Everybody VI', issuer: 'Coursera', image: '/asset/images/Screenshot_2025-07-24_135923.png' },
  { name: 'Build a Thon Hackathon', issuer: 'Board Infinity / APNA College LPU', image: '/asset/images/Screenshot_2024-04-17_001344.png' },
  { name: 'Responsive Web Design', issuer: 'freeCodeCamp', image: '/asset/images/Screenshot_2024-04-17_143944.png' },
];

export const PROJECTS = [
  {
    title: 'EmergencyMesh',
    description: 'Infrastructure-free emergency communication using Bluetooth Low Energy mesh networking. When the internet goes down, EmergencyMesh keeps people connected.',
    technologies: ['Android', 'Kotlin', 'Bluetooth LE'],
    url: 'https://github.com/raviraj82891/Sos-app.git',
    category: 'mobile',
  },
  {
    title: 'PRIMETRADE.AI Analytics',
    description: 'Explore the relationship between trader performance on Hyperliquid and Bitcoin market sentiment (Fear & Greed Index). Includes interactive dashboards and statistical EDA.',
    technologies: ['Python', 'Pandas', 'Plotly', 'SciPy'],
    url: 'https://github.com/raviraj82891/PRIMETRADE.AI-ANALYTICS-Trader-Performance-Market-Sentiment',
    category: 'ai',
  },
  {
    title: 'ATS Resume Checker',
    description: 'AI-powered ATS Resume Checker powered by Groq AI, PHP, and MySQL. Performs detailed keyword mapping, scoring, and provides actionable improvement suggestions.',
    technologies: ['PHP', 'MySQL', 'Groq AI', 'JavaScript'],
    url: 'https://github.com/raviraj82891/ats-checker',
    category: 'web',
  },
  {
    title: 'Raviraj Portfolio',
    description: 'A modern, responsive, and elegant personal portfolio website built with React, Vite, and CSS animations to showcase projects, skills, and certifications.',
    technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
    url: 'https://github.com/raviraj82891/raviraj-portfolio',
    category: 'web',
  },
  {
    title: 'Racing Car Game in Unity3D',
    description: 'Developed a fully functional 3D racing car game using Unity3D engine. Integrated advanced physics, AI opponents, and responsive controls for an immersive racing experience.',
    technologies: ['Unity3D', 'C#'],
    url: '',
    category: 'game',
  },
  {
    title: 'HearMeOut AI',
    description: 'Built an interactive chatbot using HTML, CSS, JavaScript, and APIs, hosted on Netlify. Showcased expertise in API integration and responsive design.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    url: 'https://hearmeoutv2-raviraj.netlify.app/',
    category: 'web',
  },
  {
    title: 'Chess Engine with AI',
    description: 'Developed a fully functional chess engine using Python and Pygame, capable of human vs AI gameplay. Integrated Minimax, Alpha-Beta Pruning, and Greedy evaluation.',
    technologies: ['Python', 'Pygame'],
    url: 'https://github.com/raviraj82891/chess-with-ai',
    category: 'ai',
  },
  {
    title: 'EdLearn',
    description: 'Developed a full-featured e-learning platform with interactive courses and real-time learning resources with responsive design.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    url: 'https://learnravi.netlify.app/',
    category: 'web',
  },
  {
    title: 'Sustainable Development',
    description: 'Developed a web project showcasing sustainable solutions. Focused on clean UI, accessibility, and educational impact for environmental awareness.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    url: 'https://aquamarine-malabi-87c9c7.netlify.app/',
    category: 'web',
  },
];

export const FILESYSTEM: Record<string, string[]> = {
  '~': ['Desktop', 'Documents', 'Projects', 'Downloads', 'Certificates', '.config', '.ssh', 'README.md'],
  '~/Desktop': ['terminal.sh', 'about.txt', 'projects.lnk'],
  '~/Documents': ['resume.pdf', 'cover_letter.md', 'notes.txt'],
  '~/Projects': [
    'EmergencyMesh',
    'PRIMETRADE.AI',
    'AtsChecker',
    'RavirajPortfolio',
    'Chess-AI',
    'HearMeOut-AI',
    'EdLearn',
    'RacingGame',
    'Sustainable-Dev'
  ],
  '~/Downloads': ['wallpaper.png', 'setup.sh', 'config.tar.gz'],
  '~/Certificates': [
    'Quick_Heal_Securing_Computing.png',
    'IBM_SkillsBuild_Data_Analytics.jpeg',
    'Coursera_Web_Design_Capstone.png',
    'Coursera_AI_Essentials.png',
    'FreeCodeCamp_Responsive_Design.png',
    'Build_a_Thon_Hackathon.png',
  ],
  '~/.config': ['hypr', 'waybar', 'kitty', 'neofetch'],
  '~/.ssh': ['id_rsa', 'id_rsa.pub', 'known_hosts', 'config'],

  // EmergencyMesh (Sos-app)
  '~/Projects/EmergencyMesh': ['README.md', 'app'],
  '~/Projects/EmergencyMesh/app': ['src', 'build.gradle.kts'],
  '~/Projects/EmergencyMesh/app/src': ['main'],
  '~/Projects/EmergencyMesh/app/src/main': ['java', 'AndroidManifest.xml'],
  '~/Projects/EmergencyMesh/app/src/main/java': ['com'],
  '~/Projects/EmergencyMesh/app/src/main/java/com': ['raviraj'],
  '~/Projects/EmergencyMesh/app/src/main/java/com/raviraj': ['emergencymesh'],
  '~/Projects/EmergencyMesh/app/src/main/java/com/raviraj/emergencymesh': ['MainActivity.kt', 'MeshRadarView.kt'],

  // PRIMETRADE.AI
  '~/Projects/PRIMETRADE.AI': ['README.md', 'analyze_performance.py', 'create_dashboard.py', 'download_data.py'],

  // AtsChecker
  '~/Projects/AtsChecker': ['README.md', 'index.html', 'analyze.php', 'config.php', 'setup.sql'],

  // RavirajPortfolio
  '~/Projects/RavirajPortfolio': ['README.md', 'package.json', 'vite.config.js', 'src'],
  '~/Projects/RavirajPortfolio/src': ['App.jsx', 'main.jsx', 'components'],
  '~/Projects/RavirajPortfolio/src/components': ['Portfolio.jsx', 'ProjectCard.jsx'],

  // Chess-AI
  '~/Projects/Chess-AI': ['README.md', 'main.py', 'chess_engine.py'],

  // HearMeOut-AI
  '~/Projects/HearMeOut-AI': ['README.md', 'index.html', 'app.js', 'style.css'],

  // EdLearn
  '~/Projects/EdLearn': ['README.md', 'index.html', 'style.css', 'courses.js'],

  // RacingGame
  '~/Projects/RacingGame': ['README.md', 'CarController.cs', 'GameManager.cs', 'AiOpponent.cs'],

  // Sustainable-Dev
  '~/Projects/Sustainable-Dev': ['README.md', 'index.html', 'app.js', 'style.css'],
};

export const FILE_CONTENTS: Record<string, string> = {
  // Desktop & Documents Files
  'README.md': `# Raviraj Sharma
> Full-Stack Developer & Cyber Security Specialist
> BCA (Hons) in Cyber Security @ Lovely Professional University

## Skills
- Frontend: React, Next.js, TailwindCSS
- Backend: Python, Node.js, MySQL
- Security: Digital Forensics, Penetration Testing
- Languages: C, C++, Java, Python, TypeScript

## Contact
- Email: ravirajsharma82891@gmail.com
- GitHub: github.com/raviraj82891
`,
  'about.txt': `Name: Raviraj Sharma
Role: Full-Stack Developer & Cyber Security Enthusiast
Education: BCA (Hons) Cyber Security, LPU
Passion: Building secure, elegant solutions`,
  'notes.txt': `TODO:
- Finish portfolio OS
- Update resume
- Practice CTF challenges
- Learn Rust`,
  'resume.pdf': '[📄 Resume — Click to download or view in browser]',
  'cover_letter.md': `# Cover Letter

Dear Hiring Manager,

I am writing to express my interest in the developer position...
My experience in web development and cyber security makes me a strong candidate.

Best regards,
Raviraj Sharma`,

  // ----------------------------------------------------
  // EmergencyMesh Virtual Files (Sos-app)
  // ----------------------------------------------------
  '~/Projects/EmergencyMesh/README.md': `# 🚨 EmergencyMesh

Infrastructure-free emergency communication using Bluetooth Low Energy mesh networking.
When the internet goes down, EmergencyMesh keeps people connected.

## 🌐 Overview
EmergencyMesh is an Android application designed for crisis communication without internet or cellular infrastructure. Built entirely on Bluetooth Low Energy (BLE), it creates a self-healing, peer-to-peer mesh network between nearby Android devices. Users can broadcast typed emergency alerts — fire, medical emergencies, evacuation orders, and SOS distress signals — which propagate hop-by-hop through any chain of devices in range.

## ✨ Key Features
- 📡 BLE Mesh Networking: Devices advertise and scan simultaneously, forming a dynamic mesh.
- 📍 GPS-Tagged Alerts: Each emergency message is stamped with the sender's real-time GPS coordinates.
- 📊 Live Radar Visualization: Custom MeshRadarView shows nearby discovered devices in real time.
- 📟 Background Foreground Service: Mesh stays active even when the app is minimized, with a persistent notification.
`,
  '~/Projects/EmergencyMesh/app/build.gradle.kts': `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.raviraj.emergencymesh"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.raviraj.emergencymesh"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = "17"
    }
}`,
  '~/Projects/EmergencyMesh/app/src/main/AndroidManifest.xml': `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <!-- BLE and location permissions -->
    <uses-permission android:name="android.permission.BLUETOOTH" android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" android:maxSdkVersion="30" />
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />
    <uses-permission android:name="android.permission.BLUETOOTH_ADVERTISE" />
    <uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_LOCATION" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:theme="@style/Theme.EmergencyMesh">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <service
            android:name=".service.MeshService"
            android:foregroundServiceType="location"
            android:exported="false" />
    </application>
</manifest>`,
  '~/Projects/EmergencyMesh/app/src/main/java/com/raviraj/emergencymesh/MainActivity.kt': `package com.raviraj.emergencymesh

import android.Manifest
import android.animation.ObjectAnimator
import android.animation.PropertyValuesHolder
import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.content.pm.PackageManager
import android.os.*
import android.text.InputFilter
import android.view.HapticFeedbackConstants
import android.view.View
import android.view.animation.AccelerateDecelerateInterpolator
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.android.material.button.MaterialButton
import com.google.android.material.floatingactionbutton.FloatingActionButton
import com.google.android.material.progressindicator.CircularProgressIndicator
import com.raviraj.emergencymesh.ble.MeshConfig
import com.raviraj.emergencymesh.service.MeshService
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    companion object {
        private const val PREFS_NAME = "MeshPrefs"
        private const val KEY_USER_NAME = "user_name"
    }

    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestMultiplePermissions()) { permissions ->
            val allGranted = permissions.entries.all { it.value }
            if (allGranted) {
                Toast.makeText(this, "✅ Permissions granted", Toast.LENGTH_SHORT).show()
            } else {
                showPermissionRationaleDialog()
            }
        }

    private val enableBluetoothLauncher =
        registerForActivityResult(ActivityResultContracts.StartActivityForResult()) { }

    private lateinit var tvServiceStatus: TextView
    private lateinit var tvDeviceCount: TextView
    private lateinit var tvLastEmergency: TextView
    private lateinit var statusIndicator: View
    private lateinit var radarPulse: CircularProgressIndicator
    private lateinit var btnMeshToggle: MaterialButton
    private lateinit var fabSOS: FloatingActionButton
    private lateinit var meshRadarView: MeshRadarView

    private var isMeshActive = false

    private val meshReceiver = object : BroadcastReceiver() {
        override fun onReceive(context: Context?, intent: Intent?) {
            if (intent?.action == MeshConfig.ACTION_MESH_UPDATE) {
                val deviceCount = intent.getIntExtra(MeshConfig.EXTRA_DEVICE_COUNT, 0)
                tvDeviceCount.text = "$deviceCount"

                val senderId = intent.getStringExtra(MeshConfig.EXTRA_SENDER_ID)
                if (senderId != null) {
                    meshRadarView.addDiscovery(senderId)
                }

                val type = intent.getStringExtra(MeshConfig.EXTRA_EMERGENCY_TYPE)
                val msg = intent.getStringExtra(MeshConfig.EXTRA_EMERGENCY_MESSAGE)
                
                if (type != null && msg != null) {
                    val timeFormat = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
                    val time = timeFormat.format(Date())
                    tvLastEmergency.text = "[$time] $type: $msg"
                    tvLastEmergency.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)
                }
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        tvServiceStatus = findViewById(R.id.tvServiceStatus)
        tvDeviceCount = findViewById(R.id.tvDeviceCount)
        tvLastEmergency = findViewById(R.id.tvLastEmergency)
        statusIndicator = findViewById(R.id.statusIndicator)
        radarPulse = findViewById(R.id.radarPulse)
        btnMeshToggle = findViewById(R.id.btnMeshToggle)
        fabSOS = findViewById(R.id.fabSOS)
        meshRadarView = findViewById(R.id.meshRadarView)

        checkFirstRun()
        setupClickListeners()
        setupAnimations()
        
        if (!hasRequiredPermissions()) {
            requestRequiredPermissions()
        }
    }

    private fun checkFirstRun() {
        val prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
        if (!prefs.contains(KEY_USER_NAME)) {
            showNameInputDialog()
        }
    }

    private fun showNameInputDialog() {
        val input = EditText(this).apply {
            hint = "Enter your name (max 10 chars)"
            filters = arrayOf(InputFilter.LengthFilter(10))
            val padding = (16 * resources.displayMetrics.density).toInt()
            setPadding(padding, padding, padding, padding)
        }

        val container = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            addView(input)
            val params = input.layoutParams as LinearLayout.LayoutParams
            params.setMargins(40, 20, 40, 20)
            input.layoutParams = params
        }

        AlertDialog.Builder(this)
            .setTitle("Welcome to Emergency Mesh")
            .setMessage("Please enter a display name for the mesh network. This will be visible to nearby responders.")
            .setView(container)
            .setCancelable(false)
            .setPositiveButton("Save") { _, _ ->
                val name = input.text.toString().trim()
                if (name.isNotEmpty()) {
                    getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
                        .edit()
                        .putString(KEY_USER_NAME, name)
                        .apply()
                    Toast.makeText(this, "Welcome, $name!", Toast.LENGTH_SHORT).show()
                } else {
                    showNameInputDialog()
                    Toast.makeText(this, "Name cannot be empty", Toast.LENGTH_SHORT).show()
                }
            }
            .show()
    }

    private fun setupClickListeners() {
        btnMeshToggle.setOnClickListener {
            it.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)
            if (isMeshActive) {
                stopMeshService()
            } else {
                if (hasRequiredPermissions()) {
                    ensureBluetoothEnabled()
                    startMeshService()
                } else {
                    requestRequiredPermissions()
                }
            }
        }

        findViewById<View>(R.id.btnTriggerFire).apply {
            setOnClickListener { 
                applyScaleAnimation(this)
                if (hasRequiredPermissions()) {
                    triggerEmergency("FIRE", "🔥 Fire alert broadcasted!") 
                } else {
                    requestRequiredPermissions()
                }
            }
        }

        findViewById<View>(R.id.btnTriggerMedical).apply {
            setOnClickListener { 
                applyScaleAnimation(this)
                if (hasRequiredPermissions()) {
                    triggerEmergency("MEDICAL", "🚑 Medical alert broadcasted!") 
                } else {
                    requestRequiredPermissions()
                }
            }
        }

        findViewById<View>(R.id.btnTriggerEvacuation).apply {
            setOnClickListener { 
                applyScaleAnimation(this)
                if (hasRequiredPermissions()) {
                    triggerEmergency("EVACUATION", "⚠️ Evacuation alert broadcasted!") 
                } else {
                    requestRequiredPermissions()
                }
            }
        }

        fabSOS.setOnLongClickListener {
            it.performHapticFeedback(HapticFeedbackConstants.LONG_PRESS)
            if (hasRequiredPermissions()) {
                triggerEmergency("SOS", "🆘 CRITICAL SOS SIGNAL!")
                Toast.makeText(this, "🆘 EMERGENCY BROADCAST SENT!", Toast.LENGTH_LONG).show()
            } else {
                requestRequiredPermissions()
            }
            true
        }
    }

    private fun setupAnimations() {
        val pulse = ObjectAnimator.ofPropertyValuesHolder(
            fabSOS,
            PropertyValuesHolder.ofFloat("scaleX", 1.1f),
            PropertyValuesHolder.ofFloat("scaleY", 1.1f)
        ).apply {
            duration = 1000
            repeatCount = ObjectAnimator.INFINITE
            repeatMode = ObjectAnimator.REVERSE
            interpolator = AccelerateDecelerateInterpolator()
        }
        pulse.start()
    }

    private fun applyScaleAnimation(view: View) {
        view.performHapticFeedback(HapticFeedbackConstants.VIRTUAL_KEY)
        view.animate()
            .scaleX(0.95f)
            .scaleY(0.95f)
            .setDuration(100)
            .withEndAction {
                view.animate().scaleX(1f).scaleY(1f).setDuration(100).start()
            }.start()
    }

    private fun startMeshService() {
        val intent = Intent(this, MeshService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent)
        } else {
            startService(intent)
        }
        updateUiState(true)
        Toast.makeText(this, "🚀 Mesh Activated", Toast.LENGTH_SHORT).show()
    }

    private fun stopMeshService() {
        val intent = Intent(this, MeshService::class.java)
        stopService(intent)
        updateUiState(false)
        Toast.makeText(this, "🛑 Mesh Deactivated", Toast.LENGTH_SHORT).show()
    }

    private fun updateUiState(active: Boolean) {
        isMeshActive = active
        if (active) {
            btnMeshToggle.text = "DEACTIVATE MESH"
            btnMeshToggle.setBackgroundColor(ContextCompat.getColor(this, R.color.neon_red))
            tvServiceStatus.text = "SYSTEM ACTIVE"
            tvServiceStatus.setTextColor(ContextCompat.getColor(this, R.color.neon_green))
            statusIndicator.setBackgroundResource(R.drawable.status_dot_active)
            radarPulse.visibility = View.VISIBLE
            meshRadarView.visibility = View.VISIBLE
        } else {
            btnMeshToggle.text = "ACTIVATE MESH"
            btnMeshToggle.setBackgroundColor(ContextCompat.getColor(this, R.color.neon_blue))
            tvServiceStatus.text = "SYSTEM READY"
            tvServiceStatus.setTextColor(ContextCompat.getColor(this, R.color.text_secondary))
            statusIndicator.setBackgroundResource(R.drawable.status_dot_inactive)
            radarPulse.visibility = View.INVISIBLE
            meshRadarView.visibility = View.INVISIBLE
            tvDeviceCount.text = "0"
        }
    }

    private fun triggerEmergency(type: String, payload: String) {
        if (!isMeshActive) {
            Toast.makeText(this, "Please activate Mesh first", Toast.LENGTH_SHORT).show()
            return
        }
        val intent = Intent(this, MeshService::class.java).apply {
            putExtra("EMERGENCY_TYPE", type)
            putExtra("EMERGENCY_PAYLOAD", payload)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent)
        } else {
            startService(intent)
        }
    }

    private fun hasRequiredPermissions(): Boolean {
        return getRequiredPermissions().all {
            ContextCompat.checkSelfPermission(this, it) == PackageManager.PERMISSION_GRANTED
        }
    }

    private fun getRequiredPermissions(): Array<String> {
        val permissions = mutableListOf(
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            permissions.add(Manifest.permission.BLUETOOTH_SCAN)
            permissions.add(Manifest.permission.BLUETOOTH_ADVERTISE)
            permissions.add(Manifest.permission.BLUETOOTH_CONNECT)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions.add(Manifest.permission.POST_NOTIFICATIONS)
        }
        return permissions.toTypedArray()
    }

    private fun requestRequiredPermissions() {
        requestPermissionLauncher.launch(getRequiredPermissions())
    }

    private fun showPermissionRationaleDialog() {
        AlertDialog.Builder(this)
            .setTitle("Permissions Required")
            .setMessage("Emergency Mesh requires Location and Bluetooth permissions to scan for nearby devices and broadcast alerts during emergencies.")
            .setPositiveButton("Grant") { _, _ -> requestRequiredPermissions() }
            .setNegativeButton("Cancel", null)
            .show()
    }

    private fun ensureBluetoothEnabled() {
        val bluetoothManager = getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
        val adapter = bluetoothManager.adapter
        if (adapter != null && !adapter.isEnabled) {
            val intent = Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE)
            enableBluetoothLauncher.launch(intent)
        }
    }

    override fun onStart() {
        super.onStart()
        val filter = IntentFilter(MeshConfig.ACTION_MESH_UPDATE)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            registerReceiver(meshReceiver, filter, Context.RECEIVER_EXPORTED)
        } else {
            registerReceiver(meshReceiver, filter)
        }
    }

    override fun onStop() {
        super.onStop()
        unregisterReceiver(meshReceiver)
    }
}`,
  '~/Projects/EmergencyMesh/app/src/main/java/com/raviraj/emergencymesh/MeshRadarView.kt': `package com.raviraj.emergencymesh

import android.animation.ValueAnimator
import android.content.Context
import android.graphics.Canvas
import android.graphics.Paint
import android.util.AttributeSet
import android.view.View
import android.view.animation.LinearInterpolator
import androidx.core.content.ContextCompat
import kotlin.random.Random

class MeshRadarView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    private val neonBlue = ContextCompat.getColor(context, R.color.neon_blue)
    
    private val pulsePaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = neonBlue
        style = Paint.Style.STROKE
        strokeWidth = 4f
    }

    private val dotPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = neonBlue
        style = Paint.Style.FILL
    }

    private val gridPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = neonBlue
        style = Paint.Style.STROKE
        strokeWidth = 1f
        alpha = 40
    }

    private var pulseRadius = 0f
    private var pulseAlpha = 255
    private val dots = mutableListOf<RadarDot>()

    private val animator = ValueAnimator.ofFloat(0f, 1f).apply {
        duration = 2000
        repeatCount = ValueAnimator.INFINITE
        interpolator = LinearInterpolator()
        addUpdateListener {
            val progress = it.animatedValue as Float
            pulseRadius = progress * (width / 2f)
            pulseAlpha = ((1f - progress) * 255).toInt()
            invalidate()
        }
    }

    data class RadarDot(val x: Float, val y: Float, var alpha: Int = 255, val timestamp: Long = System.currentTimeMillis())

    override fun onAttachedToWindow() {
        super.onAttachedToWindow()
        animator.start()
    }

    override fun onDetachedFromWindow() {
        animator.cancel()
        super.onDetachedFromWindow()
    }

    fun addDiscovery(senderId: String) {
        val angle = Random.nextDouble(0.0, 2 * Math.PI)
        val radius = Random.nextDouble(20.0, (width / 2.5).toDouble())
        val centerX = width / 2f
        val centerY = height / 2f
        val x = (centerX + radius * Math.cos(angle)).toFloat()
        val y = (centerY + radius * Math.sin(angle)).toFloat()
        
        dots.add(RadarDot(x, y))
        if (dots.size > 15) dots.removeAt(0)
        invalidate()
    }

    override fun onDraw(canvas: Canvas) {
        val centerX = width / 2f
        val centerY = height / 2f
        val maxRadius = width / 2f

        canvas.drawCircle(centerX, centerY, maxRadius * 0.3f, gridPaint)
        canvas.drawCircle(centerX, centerY, maxRadius * 0.6f, gridPaint)
        canvas.drawCircle(centerX, centerY, maxRadius * 0.9f, gridPaint)
        canvas.drawLine(centerX - maxRadius, centerY, centerX + maxRadius, centerY, gridPaint)
        canvas.drawLine(centerX, centerY - maxRadius, centerX, centerY + maxRadius, gridPaint)

        pulsePaint.alpha = pulseAlpha
        canvas.drawCircle(centerX, centerY, pulseRadius, pulsePaint)

        val currentTime = System.currentTimeMillis()
        val iterator = dots.iterator()
        while (iterator.hasNext()) {
            val dot = iterator.next()
            val age = currentTime - dot.timestamp
            if (age > 5000) {
                iterator.remove()
                continue
            }
            dotPaint.alpha = ((1f - age / 5000f) * 255).toInt()
            canvas.drawCircle(dot.x, dot.y, 8f, dotPaint)
        }
    }
}`,

  // ----------------------------------------------------
  // PRIMETRADE.AI Virtual Files
  // ----------------------------------------------------
  '~/Projects/PRIMETRADE.AI/README.md': `# Trader Performance × Market Sentiment Analysis
### Primetrade.ai Data Science Internship Assignment

Explore the relationship between trader performance on Hyperliquid and Bitcoin market sentiment (Fear & Greed Index), uncover patterns, and deliver insights for smarter trading.

## 📊 Datasets
- Historical Trader Data: Hyperliquid (211,224 trades)
- Fear & Greed Index: Bitcoin Sentiment (2,644 days)

## 🎯 Key Findings
1. Win rates peak during Extreme Greed (49.0%) and drop to lowest during Neutral (31.7%).
2. Trade size averages are highest during sentiment extremes ($5,660 for Greed, $5,260 for Fear).
3. Short sellers significantly outperform during market stresses, winning 61.3% under Greed and 56.5% under Fear.
`,
  '~/Projects/PRIMETRADE.AI/analyze_performance.py': `import pandas as pd
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from scipy import stats
import os
import warnings
warnings.filterwarnings('ignore')

plt.rcParams.update({
    'figure.facecolor': '#1c1917',
    'axes.facecolor': '#292524',
    'text.color': '#fef3c7',
    'axes.labelcolor': '#fef3c7',
    'xtick.color': '#d6d3d1',
    'ytick.color': '#d6d3d1',
    'axes.edgecolor': '#78716c',
    'font.family': 'sans-serif',
    'font.size': 11,
    'grid.color': '#44403c',
    'grid.alpha': 0.4
})

# Load data
historical_df = pd.read_csv("data/historical_trader_data.csv")
fear_greed_df = pd.read_csv("data/fear_greed_index.csv")

historical_df['Timestamp_dt'] = pd.to_datetime(historical_df['Timestamp'], unit='ms')
historical_df['date'] = historical_df['Timestamp_dt'].dt.strftime('%Y-%m-%d')
fear_greed_df['date'] = pd.to_datetime(fear_greed_df['date']).dt.strftime('%Y-%m-%d')

# Merge trader data with sentiment index
merged_df = pd.merge(historical_df, fear_greed_df[['date', 'value', 'classification']], on='date', how='left')
merged_df['classification'] = merged_df['classification'].fillna('Unknown')
merged_df['Closed PnL'] = pd.to_numeric(merged_df['Closed PnL'], errors='coerce').fillna(0)
merged_df['Size USD'] = pd.to_numeric(merged_df['Size USD'], errors='coerce').fillna(0)

# Aggregate performance by sentiment
sentiment_order = ['Extreme Fear', 'Fear', 'Neutral', 'Greed', 'Extreme Greed']
perf = merged_df.groupby('classification').agg(
    Total_Trades=('Closed PnL', 'count'),
    Total_PnL=('Closed PnL', 'sum'),
    Average_PnL=('Closed PnL', 'mean'),
    Win_Rate=('Closed PnL', lambda x: (x > 0).mean()),
    Avg_Size_USD=('Size USD', 'mean')
).reindex(sentiment_order).fillna(0)

print("Performance by Sentiment:")
print(perf)

# Statistical T-test (Fear vs Greed)
fear_pnl = merged_df[merged_df['classification'].isin(['Fear', 'Extreme Fear'])]['Closed PnL']
greed_pnl = merged_df[merged_df['classification'].isin(['Greed', 'Extreme Greed'])]['Closed PnL']
t_stat, p_value = stats.ttest_ind(fear_pnl.dropna(), greed_pnl.dropna())
print(f"\\nT-test Fear vs Greed: t={t_stat:.4f}, p={p_value:.6f}")
`,
  '~/Projects/PRIMETRADE.AI/create_dashboard.py': `import pandas as pd
import numpy as np
from jinja2 import Template

print("Generating Interactive HTML Dashboard...")
merged_df = pd.read_csv("output/merged_trader_data.csv")

# Create HTML metrics and structure
html_template = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>PRIMETRADE.AI Sentiment Dashboard</title>
    <style>
        body { background: #0c0a09; color: #f5f5f4; font-family: system-ui; }
        .card { background: #1c1917; padding: 20px; border-radius: 12px; }
    </style>
</head>
<body>
    <h1>Trader Performance × Market Sentiment</h1>
</body>
</html>
"""
with open("output/dashboard.html", "w") as f:
    f.write(html_template)
print("Dashboard created successfully at output/dashboard.html")`,
  '~/Projects/PRIMETRADE.AI/download_data.py': `import os
import requests

print("Downloading Hyperliquid trader data and Bitcoin Fear & Greed Index datasets...")
# API endpoints for datasets
print("Downloading complete.")`,

  // ----------------------------------------------------
  // AtsChecker Virtual Files
  // ----------------------------------------------------
  '~/Projects/AtsChecker/README.md': `# ATS Resume Checker 🚀
> Powered by Groq AI + PHP + MySQL + phpMyAdmin

A modern, fast web application to review resume PDFs and documents, mapping them against custom job descriptions to calculate an ATS compatibility score, highlight missing keywords, and suggest concrete fixes.

## ⚙️ Setup Instructions
1. Import \`setup.sql\` in phpMyAdmin.
2. Edit \`config.php\` with your database credentials and Groq API Key.
3. Move folder to your server's root (\`htdocs\` or \`www\`).
`,
  '~/Projects/AtsChecker/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>ATS Resume Checker</title>
    <style>
        body { background: #0f0f13; color: #e1e1e6; font-family: 'Segoe UI', sans-serif; }
        .container { max-width: 800px; margin: 40px auto; padding: 20px; }
        .upload-card { background: #18181f; border: 2px dashed #3a3a47; border-radius: 12px; padding: 30px; text-align: center; }
        button { background: #6366f1; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
    </style>
</head>
<body>
    <div class="container">
        <h1>ATS Resume Checker</h1>
        <div class="upload-card">
            <input type="file" id="resume" />
            <textarea id="job_desc" placeholder="Paste Job Description here..."></textarea>
            <button onclick="analyze()">Scan Resume</button>
        </div>
    </div>
</body>
</html>`,
  '~/Projects/AtsChecker/analyze.php': `<?php
/**
 * analyze.php — ATS Resume Checker API
 * Call Groq AI and parse resume documents
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once 'config.php';
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$jobDesc = trim($_POST['job_desc'] ?? '');
$pasteText = trim($_POST['resume_text'] ?? '');
$resumeText = '';

if ($pasteText) {
    $resumeText = mb_substr($pasteText, 0, 4000);
} elseif (!empty($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
    // Parse uploaded files
    $ext = strtolower(pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION));
    $resumeText = "Mock extracted resume text content for $ext files.";
}

$prompt = "Analyze the resume and match with JD. Output ONLY JSON: " . $resumeText;
// Call Groq API and parse response...
$score = rand(65, 88);
echo json_encode([
    'success' => true,
    'score' => $score,
    'sections_found' => 4,
    'keywords_found' => ['PHP', 'MySQL', 'Git'],
    'keywords_missing' => ['Docker', 'AWS'],
    'improvements' => [
        'Include your GitHub and LinkedIn links',
        'Add a clear executive summary',
        'Quantify work experience impact'
    ]
]);`,
  '~/Projects/AtsChecker/config.php': `<?php
/**
 * config.php - Credentials
 */
define('GROQ_API_KEY', 'gsk_YOUR_SECRET_GROQ_API_KEY');
define('DB_HOST', 'localhost');
define('DB_NAME', 'ats_checker');
define('DB_USER', 'root');
define('DB_PASS', '');`,
  '~/Projects/AtsChecker/setup.sql': `CREATE DATABASE IF NOT EXISTS ats_checker;
USE ats_checker;

CREATE TABLE IF NOT EXISTS resume_checks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255),
  score TINYINT,
  keywords_found SMALLINT,
  keywords_missing SMALLINT,
  sections_found TINYINT,
  section_scores JSON,
  improvements JSON,
  job_desc_provided TINYINT(1),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`,

  // ----------------------------------------------------
  // RavirajPortfolio Virtual Files
  // ----------------------------------------------------
  '~/Projects/RavirajPortfolio/README.md': `# Raviraj Sharma - Personal Portfolio
React personal portfolio website built with Vite & Tailwind CSS. Designed to showcase projects, skills, education, and professional certifications.

## 🚀 Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\``,
  '~/Projects/RavirajPortfolio/package.json': `{
  "name": "raviraj-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.300.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.0"
  }
}`,
  '~/Projects/RavirajPortfolio/vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})`,
  '~/Projects/RavirajPortfolio/src/App.jsx': `import React from 'react'
import Portfolio from './components/Portfolio'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Portfolio />
    </div>
  )
}

export default App`,
  '~/Projects/RavirajPortfolio/src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
  '~/Projects/RavirajPortfolio/src/components/Portfolio.jsx': `import React from 'react'
import ProjectCard from './ProjectCard'

export default function Portfolio() {
  const projects = [
    { title: "EmergencyMesh", desc: "BLE mesh offline communicator" },
    { title: "ATS Resume Checker", desc: "Groq-powered resume evaluator" }
  ]
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <header className="mb-16">
        <h1 className="text-4xl font-bold text-indigo-400">Raviraj Sharma</h1>
        <p className="text-neutral-400 mt-2">Cyber Security BCA Student & Full Stack Developer</p>
      </header>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} title={p.title} description={p.desc} />
          ))}
        </div>
      </section>
    </div>
  )
}`,
  '~/Projects/RavirajPortfolio/src/components/ProjectCard.jsx': `import React from 'react'

export default function ProjectCard({ title, description }) {
  return (
    <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-indigo-500/50 transition-colors">
      <h3 className="text-xl font-semibold text-neutral-50">{title}</h3>
      <p className="text-neutral-400 mt-2 text-sm">{description}</p>
    </div>
  )
}`,

  // ----------------------------------------------------
  // Legacy / Mock Projects Virtual Files
  // ----------------------------------------------------
  '~/Projects/Chess-AI/README.md': `# Chess Engine with AI ♟️

A fully functional chess game engine with integrated Minimax and Alpha-Beta pruning AI.

## 🚀 Features
- Interactive Pygame board representation
- Minimax search with Alpha-Beta pruning (depth 3+)
- Greedy material evaluation
`,
  '~/Projects/Chess-AI/main.py': `import pygame
import sys
from chess_engine import GameState

# Main chess game loop in Python
def main():
    pygame.init()
    screen = pygame.display.set_mode((512, 512))
    gs = GameState()
    clock = pygame.time.Clock()
    
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()
        
        # Draw board states...
        pygame.display.flip()
        clock.tick(30)

if __name__ == '__main__':
    main()`,
  '~/Projects/Chess-AI/chess_engine.py': `class GameState:
    def __init__(self):
        # 8x8 chessboard matrix representation
        self.board = [
            ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
        ]
        self.whiteToMove = True
        self.moveLog = []`,

  '~/Projects/HearMeOut-AI/README.md': `# HearMeOut AI 💬
An AI mental health chatbot offering support, relaxation exercises, and emotional reflections. 

## 🌐 Netlify Host
Hosted at [hearmeoutv2-raviraj.netlify.app](https://hearmeoutv2-raviraj.netlify.app/)
`,
  '~/Projects/HearMeOut-AI/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>HearMeOut AI Chatbot</title>
</head>
<body>
    <div class="chat-container">
        <h2>HearMeOut Mental Health Companion</h2>
        <div id="chatbox"></div>
        <input type="text" id="userInput" placeholder="Talk to me..." />
    </div>
</body>
</html>`,
  '~/Projects/HearMeOut-AI/app.js': `async function sendMessage() {
    const text = document.getElementById("userInput").value;
    // Connect with Gemini or Cohere API for friendly conversational support
    console.log("Sent prompt: " + text);
}`,
  '~/Projects/HearMeOut-AI/style.css': `body { background: #121216; color: #e1e1e6; }
.chat-container { border-radius: 8px; max-width: 500px; margin: auto; }`,

  '~/Projects/EdLearn/README.md': `# EdLearn Platform 🎓
Interactive courses and online learning resources built with jQuery and HTML/CSS.
`,
  '~/Projects/EdLearn/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>EdLearn Courses</title>
</head>
<body>
    <header><h1>EdLearn Platform</h1></header>
    <div class="course-grid">
        <div class="card"><h3>Cyber Security Intro</h3><button>Enroll</button></div>
    </div>
</body>
</html>`,
  '~/Projects/EdLearn/style.css': `body { font-family: sans-serif; background: #fafafa; }
.course-grid { display: grid; grid-template-columns: repeat(3, 1fr); }`,
  '~/Projects/EdLearn/courses.js': `$(document).ready(function() {
    $(".card button").click(function() {
        alert("Enrolled in Course successfully!");
    });
});`,

  '~/Projects/RacingGame/README.md': `# Unity3D Racing Game 🏎️

Fully functional 3D racing game utilizing Unity, integrated physics engine, waypoint-following AI opponents, and responsive car physics controllers.
`,
  '~/Projects/RacingGame/CarController.cs': `using UnityEngine;

public class CarController : MonoBehaviour
{
    public float motorForce = 1500f;
    public float maxSteerAngle = 30f;
    
    public WheelCollider frontLeft, frontRight;
    public WheelCollider rearLeft, rearRight;
    
    private float horizontalInput;
    private float verticalInput;
    
    void FixedUpdate()
    {
        horizontalInput = Input.GetAxis("Horizontal");
        verticalInput = Input.GetAxis("Vertical");
        
        frontLeft.steerAngle = horizontalInput * maxSteerAngle;
        frontRight.steerAngle = horizontalInput * maxSteerAngle;
        
        rearLeft.motorTorque = verticalInput * motorForce;
        rearRight.motorTorque = verticalInput * motorForce;
    }
}`,
  '~/Projects/RacingGame/GameManager.cs': `using UnityEngine;

public class GameManager : MonoBehaviour
{
    public Transform[] spawnPoints;
    public GameObject carPrefab;
    
    void Start()
    {
        Instantiate(carPrefab, spawnPoints[0].position, spawnPoints[0].rotation);
        Debug.Log("Race Started! May the best driver win.");
    }
}`,
  '~/Projects/RacingGame/AiOpponent.cs': `using UnityEngine;

public class AiOpponent : MonoBehaviour
{
    public Transform[] waypoints;
    private int currentWaypoint = 0;
    
    void Update()
    {
        Vector3 target = waypoints[currentWaypoint].position;
        transform.position = Vector3.MoveTowards(transform.position, target, 15f * Time.deltaTime);
        
        if (Vector3.Distance(transform.position, target) < 1f)
        {
            currentWaypoint = (currentWaypoint + 1) % waypoints.Length;
        }
    }
}`,

  '~/Projects/Sustainable-Dev/README.md': `# Sustainable Development Project 🌱
Collage project highlighting sustainable environmental designs, educational resources, and interactive carbon footprint calculators.
`,
  '~/Projects/Sustainable-Dev/index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sustainable Development Goals</title>
</head>
<body>
    <h1>EcoSmart Sustainable Portal</h1>
</body>
</html>`,
  '~/Projects/Sustainable-Dev/app.js': `function calculateCarbonFootprint() {
    // Basic carbon calculation logic
    console.log("Calculated emissions: 2.4 tons CO2/year");
}`,
  '~/Projects/Sustainable-Dev/style.css': `body { background: #f0fdf4; color: #166534; }`,
};

export const NEOFETCH_ART = `\x1b[36m
             ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄             \x1b[0m   \x1b[1;32mraviraj\x1b[0m@\x1b[1;32mraviraj-os\x1b[0m
           \x1b[36m▄▀░░░░░░░░░░░░░░▀▄           \x1b[0m   ─────────────────────
          \x1b[36m█░░░░░░░░░░░░░░░░░░█          \x1b[0m   \x1b[1;33mOS:\x1b[0m      RavirajOS v2.0
         \x1b[36m█░░░░░░▀▀▀▀▀░░░░░░░█         \x1b[0m   \x1b[1;33mHost:\x1b[0m    Portfolio Terminal
        \x1b[36m█░░░░░░░█▀▀▀█░░░░░░░█        \x1b[0m   \x1b[1;33mKernel:\x1b[0m  6.9.0-cyber
       \x1b[36m █░░░░░░░█   █░░░░░░░█       \x1b[0m   \x1b[1;33mUptime:\x1b[0m  Since Aug 2023
       \x1b[36m █░░░░░░░▀▀▀▀▀░░░░░░░█       \x1b[0m   \x1b[1;33mShell:\x1b[0m   raviraj-sh 1.0
       \x1b[36m █░░░░░░░░░░░░░░░░░░░█       \x1b[0m   \x1b[1;33mDE:\x1b[0m      CyberDE
       \x1b[36m █░░░░░░░░░░░░░░░░░░░█       \x1b[0m   \x1b[1;33mWM:\x1b[0m      Hyprland
        \x1b[36m█░░░░░░░░░░░░░░░░░░█        \x1b[0m   \x1b[1;33mTheme:\x1b[0m   Cyberpunk-Dark
         \x1b[36m▀▀█░░░░░░░░░░░░█▀▀         \x1b[0m   \x1b[1;33mLang:\x1b[0m    C++ / Python / JS
            \x1b[36m▀▀▀▀▀▀▀▀▀▀▀▀            \x1b[0m   \x1b[1;33mEditor:\x1b[0m  VS Code + Neovim
`;
