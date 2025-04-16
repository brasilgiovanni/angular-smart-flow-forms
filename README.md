# 🚀 Angular Smart Flow Forms

> 🔥A modular, scalable & standalone-component library for dynamic multi‑step form wizards in Angular 19.

## 🎯 Overview
Build clean, reusable form flows with:
- **Data Service** for shared form state  
- **Validation Service** for centralized rules  
- **Stepper Service** for navigation control  
- **State Management** with RxJS  
- **HTTP Adapters** (real & mock)  

## ✨ Features
- ✅ Dynamic step rendering & progress tracking  
- ✅ Built‑in CPF, email & conditional validations  
- ✅ UF/Município selects via API or mock data  
- ✅ Easy to extend & themeable UI  

## :interrobang ABOUT

This project presents **two different structures** for form steppers, each with its own design and technology approach:

### 1. ReactiveStepper  
**Name:** ReactiveStepper  
**Description:**  
A **classic reactive stepper** built with `BehaviorSubject` and RxJS, organized in a modular architecture of components and services (Main, Header, Footer, StepperService, StateFormService, ValidationService).  
- **Compatibility:** Angular 15+  
- **Key Features:**  
  - Step navigation controlled via RxJS streams  
  - Centralized FormGroups managed by a state service  
  - Synchronized validation handled by a dedicated ValidationService  
  - Simple to replicate and integrate into other projects  

### 2. ComposableSignalStepper  
**Name:** ComposableSignalStepper  
**Description:**  
A **generic and reusable stepper library** designed for any linear step flow, based on Angular 17+’s modern **Signals API**. All state and navigation logic (e.g., "Next" button activation) is handled via `signal()` and `computed()`, with no manual subscriptions.  
- **Compatibility:** Angular 17+  
- **Key Features:**  
  - Native reactive state management using Signals (no RxJS)  
  - Validation handled through `Signal<boolean>` in each StepDefinition  
  - Predefined, plug-and-play Header and Footer components  
  - “Shared folder” architecture for easy reuse across multiple workflows  

Both steppers provide a **solid foundation** for building scalable, maintainable, and testable form wizards — choose the one that best fits your project needs!

## 🛠️ Installation
```bash
npm install
```
## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**  
2. **Clone your fork**  
   ```bash
   git clone https://github.com/your-username/angular-smart-flow-forms.git
   cd angular-smart-flow-forms
   ```
3. **Git checkout -b feat/your-feature
4. **Make your changes
5. **Stage and commit
  git add .
  git commit -m "feat: describe your feature"
6. **Push to your branch
  git push origin feat/your-feature
7. **Open a Pull Request against main in the original repository

## 📄 License
This project is licensed under the [MIT License](LICENSE).
