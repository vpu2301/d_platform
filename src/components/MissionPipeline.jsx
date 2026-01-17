import React, { useState } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Target, Users, Radio, Calendar, MapPin, CheckCircle, ArrowRight, FileText, Zap, Shield, Eye } from 'lucide-react';

/**
 * Mission Pipeline - NATO Best Practices Mission Planning
 * Follows NATO 7-Step Mission Analysis Process
 */
export const MissionPipeline = ({ isOpen, onClose, onCreateMission }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [missionConfig, setMissionConfig] = useState({
    name: '',
    type: 'intelligence', // intelligence, strike, support, simulation
    phase: 'planning',
    commanderIntent: '',
    missionStatement: '',
    objectives: [],
    friendlyForces: [],
    enemyForces: [],
    terrain: {},
    timeAvailable: { hours: 24 },
    risks: [],
    coursesOfAction: [],
    resources: [],
    coordination: {},
  });

  const missionTypes = [
    { id: 'intelligence', name: 'Intelligence', icon: Eye, color: 'green', description: 'Reconnaissance and intelligence gathering' },
    { id: 'strike', name: 'Strike', icon: Zap, color: 'red', description: 'Combat and engagement operations' },
    { id: 'support', name: 'Support', icon: Shield, color: 'orange', description: 'Logistics and tactical support' },
    { id: 'simulation', name: 'Simulation', icon: Target, color: 'purple', description: 'Training and scenario simulation' },
  ];

  // NATO 7-Step Mission Analysis
  const steps = [
    {
      id: 'mission',
      title: 'Mission Analysis',
      description: 'Review mission order and commander\'s intent',
      icon: FileText,
    },
    {
      id: 'situation',
      title: 'Situation & Mission',
      description: 'Define friendly and enemy situation',
      icon: MapPin,
    },
    {
      id: 'courses',
      title: 'Courses of Action',
      description: 'Develop and analyze COAs',
      icon: Target,
    },
    {
      id: 'compare',
      title: 'Compare COAs',
      description: 'Evaluate and compare options',
      icon: CheckCircle,
    },
    {
      id: 'approve',
      title: 'Approval & Orders',
      description: 'Approve selected COA',
      icon: ArrowRight,
    },
    {
      id: 'execute',
      title: 'Mission Execution',
      description: 'Initiate mission operations',
      icon: Zap,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    onCreateMission?.(missionConfig);
    onClose();
    // Reset
    setCurrentStep(0);
    setMissionConfig({
      name: '',
      type: 'intelligence',
      phase: 'planning',
      commanderIntent: '',
      missionStatement: '',
      objectives: [],
      friendlyForces: [],
      enemyForces: [],
      terrain: {},
      timeAvailable: { hours: 24 },
      risks: [],
      coursesOfAction: [],
      resources: [],
      coordination: {},
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Mission Analysis
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Mission Name</label>
              <input
                type="text"
                value={missionConfig.name}
                onChange={(e) => setMissionConfig({ ...missionConfig, name: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono"
                placeholder="Operation Code Name"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Mission Type</label>
              <div className="grid grid-cols-4 gap-2">
                {missionTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = missionConfig.type === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setMissionConfig({ ...missionConfig, type: type.id })}
                      className={`p-3 border text-left transition-all ${
                        isSelected
                          ? `bg-${type.color}-500/10 border-${type.color}-500/30 text-${type.color}-500`
                          : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-400 hover:border-[#0088ff]/30'
                      }`}
                    >
                      <Icon size={20} className="mb-2" />
                      <div className="text-xs font-mono font-semibold uppercase">{type.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{type.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Commander's Intent</label>
              <textarea
                value={missionConfig.commanderIntent}
                onChange={(e) => setMissionConfig({ ...missionConfig, commanderIntent: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-24"
                placeholder="Enter commander's intent and desired end state..."
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Mission Statement</label>
              <textarea
                value={missionConfig.missionStatement}
                onChange={(e) => setMissionConfig({ ...missionConfig, missionStatement: e.target.value })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-24"
                placeholder="Who, What, When, Where, Why (5Ws)..."
              />
            </div>
          </div>
        );

      case 1: // Situation & Mission
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Friendly Forces</label>
                <textarea
                  value={missionConfig.friendlyForces.join('\n')}
                  onChange={(e) => setMissionConfig({ ...missionConfig, friendlyForces: e.target.value.split('\n').filter(f => f.trim()) })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-32"
                  placeholder="Unit-1, Unit-2, Unit-3..."
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Enemy Forces</label>
                <textarea
                  value={missionConfig.enemyForces.join('\n')}
                  onChange={(e) => setMissionConfig({ ...missionConfig, enemyForces: e.target.value.split('\n').filter(f => f.trim()) })}
                  className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-32"
                  placeholder="Threat-1, Threat-2..."
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Terrain & Weather</label>
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Terrain Type"
                  className="px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Weather Conditions"
                  className="px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs font-mono"
                />
                <input
                  type="text"
                  placeholder="Visibility"
                  className="px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-xs font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Time Available (Hours)</label>
              <input
                type="number"
                min="1"
                max="168"
                value={missionConfig.timeAvailable.hours}
                onChange={(e) => setMissionConfig({ ...missionConfig, timeAvailable: { hours: parseInt(e.target.value) } })}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono"
              />
            </div>
          </div>
        );

      case 2: // Courses of Action
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Primary COA</label>
              <textarea
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-32"
                placeholder="Describe primary course of action..."
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Alternative COA</label>
              <textarea
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-32"
                placeholder="Describe alternative course of action..."
              />
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Key Tasks</label>
              <textarea
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono h-24"
                placeholder="Task 1, Task 2, Task 3..."
              />
            </div>
          </div>
        );

      case 3: // Compare COAs
        return (
          <div className="space-y-4">
            <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">COA Comparison Matrix</div>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div className="font-mono text-slate-400">Criteria</div>
                <div className="font-mono text-slate-400">COA 1</div>
                <div className="font-mono text-slate-400">COA 2</div>
                {['Feasibility', 'Acceptability', 'Suitability', 'Completeness'].map((criteria) => (
                  <React.Fragment key={criteria}>
                    <div className="text-slate-300">{criteria}</div>
                    <div className="text-center">
                      <select className="w-full px-2 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                    <div className="text-center">
                      <select className="w-full px-2 py-1 bg-[#0f0f0f] border border-[#1a1a1a] text-white text-xs">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Approval
        return (
          <div className="space-y-4">
            <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a]">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                  <div className="text-sm font-mono text-white uppercase">Selected COA: Primary</div>
                  <div className="text-xs text-slate-500">Ready for approval</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Mission Summary</div>
                <div className="text-xs text-slate-300 space-y-1">
                  <div><span className="text-slate-500">Type:</span> {missionTypes.find(t => t.id === missionConfig.type)?.name}</div>
                  <div><span className="text-slate-500">Name:</span> {missionConfig.name || 'Unnamed Mission'}</div>
                  <div><span className="text-slate-500">Duration:</span> {missionConfig.timeAvailable.hours}h</div>
                  <div><span className="text-slate-500">Forces:</span> {missionConfig.friendlyForces.length} friendly units</div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-500 uppercase tracking-wide mb-2">Commander Approval</label>
              <input
                type="text"
                placeholder="Commander Name / Signature"
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-white text-sm font-mono"
              />
            </div>
          </div>
        );

      case 5: // Execute
        return (
          <div className="space-y-4">
            <div className="border border-[#1a1a1a] p-4 bg-[#0a0a0a] text-center">
              <Zap size={48} className="mx-auto mb-4 text-[#0088ff]" />
              <div className="text-lg font-mono text-white uppercase mb-2">Mission Ready</div>
              <div className="text-xs text-slate-400 mb-4">All phases completed. Ready to initiate mission.</div>
              <Button variant="primary" onClick={handleCreate} className="w-full">
                CREATE MISSION
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="NATO MISSION PIPELINE" className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <div className="space-y-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-between border-b border-[#1a1a1a] pb-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'bg-[#0088ff]/20 border-[#0088ff] text-[#0088ff]'
                        : isCompleted
                        ? 'bg-green-500/20 border-green-500 text-green-500'
                        : 'bg-[#0f0f0f] border-[#1a1a1a] text-slate-500'
                    }`}
                  >
                    <StepIcon size={18} />
                  </div>
                  <div className={`text-xs mt-2 text-center ${isActive ? 'text-[#0088ff]' : isCompleted ? 'text-green-500' : 'text-slate-500'}`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-[#1a1a1a]'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
          <Button variant="ghost" onClick={handlePrevious} disabled={currentStep === 0}>
            PREVIOUS
          </Button>
          <div className="text-xs text-slate-500 font-mono">
            Step {currentStep + 1} of {steps.length}
          </div>
          {currentStep < steps.length - 1 ? (
            <Button variant="primary" onClick={handleNext}>
              NEXT
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCreate}>
              CREATE MISSION
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
