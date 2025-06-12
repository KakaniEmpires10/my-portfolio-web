class AccessibleTabs {
  constructor(tabsContainer) {
    this.tabsContainer = tabsContainer;
    this.tabList = tabsContainer.querySelector('[role="tablist"]');
    this.tabs = Array.from(tabsContainer.querySelectorAll('[role="tab"]'));
    this.panels = Array.from(
      tabsContainer.querySelectorAll('[role="tabpanel"]')
    );

    this.init();
  }

  init() {
    // Add event listeners
    this.tabList.addEventListener("click", this.handleTabClick.bind(this));
    this.tabList.addEventListener("keydown", this.handleTabKeyDown.bind(this));

    // Set initial state
    this.setActiveTab(0);
  }

  handleTabClick(event) {
    const clickedTab = event.target.closest('[role="tab"]');
    if (!clickedTab) return;

    const tabIndex = this.tabs.indexOf(clickedTab);
    this.setActiveTab(tabIndex);
  }

  handleTabKeyDown(event) {
    const currentTab = event.target;
    const currentIndex = this.tabs.indexOf(currentTab);
    let targetIndex;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        targetIndex =
          currentIndex === 0 ? this.tabs.length - 1 : currentIndex - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        targetIndex =
          currentIndex === this.tabs.length - 1 ? 0 : currentIndex + 1;
        break;
      case "Home":
        event.preventDefault();
        targetIndex = 0;
        break;
      case "End":
        event.preventDefault();
        targetIndex = this.tabs.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        this.setActiveTab(currentIndex);
        return;
      default:
        return;
    }

    if (targetIndex !== undefined) {
      this.tabs[targetIndex].focus();
      this.setActiveTab(targetIndex);
    }
  }

  setActiveTab(activeIndex) {
    // Update tabs
    this.tabs.forEach((tab, index) => {
      const isActive = index === activeIndex;
      tab.setAttribute("aria-selected", isActive.toString());
      tab.tabIndex = isActive ? 0 : -1;
    });

    // Update panels
    this.panels.forEach((panel, index) => {
      const isActive = index === activeIndex;
      panel.setAttribute("aria-hidden", (!isActive).toString());
    });
  }
}
