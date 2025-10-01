import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';

interface WindowWithGoogle extends Window {
  google?: any;
}

declare var window: WindowWithGoogle;

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [App] // Não standalone no teste
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    // Limpa o google mock
    delete window['google'];
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call initializeGoogleButton if google is already defined', () => {
    window['google'] = {
      accounts: { id: { initialize: jasmine.createSpy(), renderButton: jasmine.createSpy(), prompt: jasmine.createSpy() } }
    };

    spyOn(component, 'initializeGoogleButton');

    component.ngOnInit();

    expect(component.initializeGoogleButton).toHaveBeenCalled();
  });

  it('should set isAuthenticated to true when handleCredentialResponse is called', () => {
    expect(component.isAuthenticated()).toBeFalse();

    component.handleCredentialResponse();

    expect(component.isAuthenticated()).toBeTrue();
  });

  it('should initialize Google button correctly', () => {
    const initializeSpy = jasmine.createSpy();
    const renderButtonSpy = jasmine.createSpy();
    const promptSpy = jasmine.createSpy();

    // Mock google global
    window['google'] = { accounts: { id: { initialize: initializeSpy, renderButton: renderButtonSpy, prompt: promptSpy } } };

    component.initializeGoogleButton();

    expect(initializeSpy).toHaveBeenCalled();
    expect(renderButtonSpy).toHaveBeenCalled();
    expect(promptSpy).toHaveBeenCalled();
  });
});
