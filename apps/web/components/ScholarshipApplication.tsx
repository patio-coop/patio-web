"use client";

import { FormEvent, useState } from "react";

import { cooperatives } from "@/data/home";

const networkDurations = [
  "Less than 6 months",
  "6–12 months",
  "1–2 years",
  "More than 2 years"
];

const constraintDurations = [
  "Up to 3 months",
  "3–6 months",
  "6–12 months",
  "More than 12 months"
];

const confirmations = [
  "I understand this scholarship is a temporary arrangement, reviewed and decided by the Internal Organisation & Community Support circle.",
  "I understand that Full Membership via scholarship does not exempt my cooperative from the revenue-share commitment (min. 2%) on any deals sourced through the Patio Brand.",
  "I commit to revisiting my cooperative's capacity to contribute (via fee or labour) at the end of the stated period.",
  "The information I have provided in this form is accurate and honest."
];

export function ScholarshipApplication() {
  const [submissionBlocked, setSubmissionBlocked] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionBlocked(true);
  };

  return (
    <div className="scholarship-application">
      <aside className="scholarship-info">
        <div className="scholarship-info__intro">
          <h2 id="scholarship-title">Financial hardship application</h2>
          <p>
            Patio is a global network of tech cooperatives built on fair
            contribution. To stay sustainable and serve its members well, the
            network relies on two core commitments from Full Members: a €500
            annual membership fee and/or active participation in a Patio
            circle.
          </p>
          <p>
            These aren&apos;t arbitrary conditions — they&apos;re what keeps
            the network alive.
          </p>
        </div>

        <div className="scholarship-paths" aria-label="Full membership paths">
          <article className="scholarship-path scholarship-path--fee">
            <span>Path 01</span>
            <div className="scholarship-path__rule" aria-hidden="true" />
            <h3>€500 annual membership fee</h3>
            <p>
              This is the primary, predictable revenue that funds Patio&apos;s
              platform, coordination, communications, and events. Without it,
              the network cannot operate.
            </p>
            <strong>Funds operations</strong>
          </article>

          <article className="scholarship-path scholarship-path--labour">
            <span>Path 02</span>
            <div className="scholarship-path__rule" aria-hidden="true" />
            <h3>Active unpaid labour contribution</h3>
            <p>
              Time and expertise are a valid form of membership. Contributing
              to a Patio circle — like Outreach, Comms, or Community — directly
              builds the network&apos;s capacity.
            </p>
            <strong>Builds the network</strong>
          </article>

          <article className="scholarship-path scholarship-path--active">
            <span>Path 03</span>
            <div className="scholarship-path__rule" aria-hidden="true" />
            <h3>Why we offer this option</h3>
            <p>
              Some cooperatives are going through a phase where neither a
              financial contribution nor a time commitment is feasible — yet
              they are genuinely committed to Patio and its mission. The
              Scholarship path exists to honour that. It is reviewed by the
              Internal Organisation & Community Support circle, with
              transparent reasoning, and is intended as a{" "}
              temporary bridge — not a permanent alternative to contribution.
            </p>
          </article>
        </div>
      </aside>

      <form className="scholarship-form" onSubmit={handleSubmit}>
        <div className="scholarship-field">
          <label htmlFor="scholarship-cooperative">Cooperative Name*</label>
          <input
            id="scholarship-cooperative"
            name="cooperative"
            list="patio-cooperatives"
            placeholder="e.g. Greenfield Tech Cooperative"
            required
          />
          <datalist id="patio-cooperatives">
            {cooperatives.map((cooperative) => (
              <option value={cooperative.name} key={cooperative.name} />
            ))}
          </datalist>
        </div>

        <div className="scholarship-form__columns">
          <div className="scholarship-field">
            <label htmlFor="scholarship-name">Contact Name*</label>
            <input
              id="scholarship-name"
              name="contactName"
              autoComplete="name"
              placeholder="Your full name"
              required
            />
          </div>
          <div className="scholarship-field">
            <label htmlFor="scholarship-email">Contact Email*</label>
            <input
              id="scholarship-email"
              name="contactEmail"
              type="email"
              autoComplete="email"
              placeholder="you@yourcoop.org"
              required
            />
          </div>
        </div>

        <div className="scholarship-form__columns">
          <div className="scholarship-field">
            <label htmlFor="scholarship-country">Country</label>
            <input
              id="scholarship-country"
              name="country"
              autoComplete="country-name"
              placeholder="e.g. Spain"
            />
          </div>
          <div className="scholarship-field">
            <label htmlFor="scholarship-website">Website</label>
            <input
              id="scholarship-website"
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://yourcoop.org"
            />
          </div>
        </div>

        <div className="scholarship-field">
          <label htmlFor="scholarship-network-duration">
            How long have you been part of the Patio network?
          </label>
          <select
            id="scholarship-network-duration"
            name="networkDuration"
            defaultValue=""
          >
            <option value="" disabled>
              Select one...
            </option>
            {networkDurations.map((duration) => (
              <option value={duration} key={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>

        <ScholarshipTextarea
          id="scholarship-reason"
          name="reason"
          label="Why are you applying for Full Membership via the Scholarship path?*"
          help="Please describe your situation honestly. Why do you want Full Membership, and why are neither the fee nor a labour contribution currently possible for you?"
          placeholder="e.g. We are a small cooperative going through a restructuring period. We deeply believe in Patio's mission and want to stay actively connected to the network and its opportunities, but we currently don't have the financial headroom for the €500 fee, and our team is at full capacity..."
          required
        />

        <ScholarshipTextarea
          id="scholarship-fee"
          name="feeConstraint"
          label="What is preventing you from paying the €500 annual fee?*"
          help="A brief, honest explanation helps the review circle make a fair decision."
          placeholder="e.g. We are between major contracts and operating on reduced income for the next quarter..."
          required
        />

        <ScholarshipTextarea
          id="scholarship-labour"
          name="labourConstraint"
          label="What is preventing you from contributing active unpaid labour to a Patio circle?*"
          help="E.g. your team members are fully allocated, you're in a hiring or growth phase, or bandwidth is currently limited."
          placeholder="e.g. All our team members are currently engaged in billable client work with no available hours for unpaid commitments..."
          required
        />

        <ScholarshipTextarea
          id="scholarship-change"
          name="expectedChange"
          label="What do you expect to change after this period?"
          help="Briefly describe what will enable you to contribute through Path 01 or Path 02 once circumstances improve."
          placeholder="e.g. We expect to close two new contracts by Q3, which would free up budget to cover the membership fee from September..."
        />

        <div className="scholarship-field">
          <label htmlFor="scholarship-period">
            For how long do you expect these constraints to apply?*
          </label>
          <small>
            The scholarship is designed as a temporary measure. Please indicate
            your best estimate of the timeframe.
          </small>
          <select
            id="scholarship-period"
            name="constraintDuration"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Select a period...
            </option>
            {constraintDurations.map((duration) => (
              <option value={duration} key={duration}>
                {duration}
              </option>
            ))}
          </select>
        </div>

        <ScholarshipTextarea
          id="scholarship-contribution"
          name="informalContribution"
          label="Is there any way you can contribute to the network during this period, even in a small or informal way?"
          help="Optional — but anything you can offer helps the review circle see your commitment to the network."
          placeholder="e.g. We could share Patio content on our social channels, refer potential member coops, or participate in community calls..."
        />

        <fieldset className="scholarship-confirmations">
          <legend>Confirmations</legend>
          {confirmations.map((confirmation, index) => (
            <label key={confirmation}>
              <input
                type="checkbox"
                name={`confirmation${index + 1}`}
                required
              />
              <span>{confirmation}</span>
            </label>
          ))}
        </fieldset>

        <p className="scholarship-form__review-note">
          Your application will be reviewed by the Internal Organisation &
          Community Support circle. You&apos;ll receive a response with
          transparent reasoning. This is not a guarantee of approval — it is a
          fair, human process.
        </p>

        {submissionBlocked ? (
          <p className="scholarship-form__status" role="status">
            The application could not be sent because the submission service
            has not been connected yet.
          </p>
        ) : null}

        <button className="button button--dark scholarship-form__submit" type="submit">
          Submit application
        </button>
      </form>
    </div>
  );
}

function ScholarshipTextarea({
  id,
  name,
  label,
  help,
  placeholder,
  required = false
}: {
  id: string;
  name: string;
  label: string;
  help: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className="scholarship-field scholarship-field--textarea">
      <label htmlFor={id}>{label}</label>
      <small>{help}</small>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
